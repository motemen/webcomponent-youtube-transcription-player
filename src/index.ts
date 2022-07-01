import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { VTTNode, WebVTTParser } from "webvtt-parser";

// TODO: format

declare module globalThis {
  var onYouTubeIframeAPIReady: () => void | undefined;
}

declare module YT {
  class Player {
    constructor(element: string | HTMLElement, options: any);
    seekTo(t: number): void;
  }

  function ready(callback: () => void): void;
}

type Cue = { time: number; text: string };

@customElement("youtube-transcription-player")
export class YouTubeTranscriptionPlayer extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      [data-cue-time] {
        cursor: pointer;
        background-color: inherit;
        font: inherit;
        border: none;
      }
    `,
  ];

  static globalIndex = 0;

  index: number;
  player: YT.Player | undefined;

  @property() videoId: string | null = null;
  @property() vttSource: string | null = null;
  @state() vttCues: Cue[] | null = null;

  constructor() {
    super();
    this.index = YouTubeTranscriptionPlayer.globalIndex++;
  }

  _setupPlayer() {
    this.player = new YT.Player(this.shadowRoot!.getElementById(this.playerElementId)!, {});
    console.debug("_setupPlayer", this.player);
  }

  _formatTime(t: number): string {
    const div = (x: number, y: number) => [Math.floor(x / y), x % y];
    const pad = (x: number) => (x < 10 ? "0" : "") + x;
    const [_secs, subsecs] = div(t, 1);
    const [_mins, secs] = div(_secs, 60);
    const [hours, mins] = div(_mins, 60);
    return `${hours}:${pad(mins)}:${pad(secs)}.${String(subsecs).substring(2, 4).padEnd(2, "0")}`;
  }

  _decodeTime(s: string): number {
    const [hours, mins, secs] = s.split(":").map((x) => parseFloat(x));
    return hours * 60 * 60 + mins * 60 + secs;
  }

  async _fetchVTT(): Promise<string> {
    if (!this.vttSource) {
      return Promise.reject("vttSource attribute required");
    }

    if (this.vttSource.startsWith("#")) {
      const el = document.querySelector(this.vttSource);
      if (el) {
        return Promise.resolve(el.textContent!);
      } else {
        return Promise.reject(`Could not find element ${this.vttSource}`);
      }
    }

    const response = await fetch(this.vttSource);
    return await response.text();
  }

  _consumeVTT(vtt: string): void {
    const parser = new WebVTTParser();
    const tree = parser.parse(vtt);
    const cues = tree.cues.flatMap((cue) => {
      const recurse = (nodes: VTTNode[], cb: (text: string) => void) => {
        nodes.forEach((node) => {
          if (node.type === "text") {
            cb(node.value);
          } else if (node.type === "object") {
            recurse(node.children, cb);
          }
        });
      };
      let text = "";
      recurse(cue.tree.children, (t) => {
        text += t;
      });
      const lines = text
        .split(/\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      return lines.map((line) => ({
        time: cue.startTime,
        text: line,
      }));
    });

    const { cues: dedupedCues } = cues.reduce(
      (acc, cue) => {
        if (cue.text === acc.curr) {
          return acc;
        }

        return {
          curr: cue.text,
          cues: [...acc.cues, cue],
        };
      },
      {
        curr: "",
        cues: <Cue[]>[],
      }
    );

    this.vttCues = dedupedCues;
  }

  get playerElementId(): string {
    return `yt-transcription-player${this.index}`;
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (!this.videoId) {
      console.error("videoId attribute required", this);
    }

    if (!this.vttSource) {
      console.error("vttSource attribute required", this);
    }

    if (typeof YT !== "undefined") {
      YT.ready(() => {
        this._setupPlayer();
      });
    } else {
      const existingReady = globalThis.onYouTubeIframeAPIReady;
      globalThis.onYouTubeIframeAPIReady = () => {
        existingReady?.();
        this._setupPlayer();
      };
    }

    this._fetchVTT().then((vtt) => {
      this._consumeVTT(vtt);
    });
  }

  _onClick(ev: MouseEvent) {
    const cueTime = (ev.target as HTMLElement)?.dataset?.cueTime;
    if (cueTime) {
      const t = this._decodeTime(cueTime);
      if (t) {
        this.player?.seekTo(t);
      }
    }
  }

  render() {
    const youtubeIframeScript = document.createElement("script");
    youtubeIframeScript.setAttribute("src", "https://www.youtube.com/iframe_api");

    // https://lit.dev/docs/v1/components/templates/
    return html`
      <iframe
        id="${this.playerElementId}"
        class="player"
        width="560"
        height="315"
        src="${`https://www.youtube.com/embed/${this.videoId}?enablejsapi=1`}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div class="transcript" @click=${this._onClick}>
        ${this.vttCues?.map(
          (cue) =>
            html`<button data-cue-time="${this._formatTime(cue.time)}" part="cue" tabindex="0">${cue.text}</button>`
        )}
      </div>
      ${youtubeIframeScript}
    `;
  }
}
