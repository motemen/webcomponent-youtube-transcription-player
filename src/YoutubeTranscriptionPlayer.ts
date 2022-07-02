import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { type VTTNode } from 'webvtt-parser';
import { decodeTime, formatTime } from './utils.js';
import { WebVTTParser } from './webvtt-parser-esm.js';

type Cue = { time: number; text: string };

export class YoutubeTranscriptionPlayer extends LitElement {
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

  player: YT.Player | undefined;

  @property() videoId: string | null = null;

  @property() vttSource: string | null = null;

  @state() vttCues: Cue[] | null = null;

  _setupPlayer() {
    this.player = new YT.Player(this.shadowRoot!.querySelector('iframe')!, {});
  }

  async _fetchVTT(): Promise<string> {
    if (!this.vttSource) {
      return Promise.reject(new Error('vttSource attribute required'));
    }

    if (this.vttSource.startsWith('#')) {
      const el = document.querySelector(this.vttSource);
      if (el) {
        return Promise.resolve(el.textContent!);
      }
      return Promise.reject(
        new Error(`Could not find element ${this.vttSource}`)
      );
    }

    const response = await fetch(this.vttSource);
    return response.text();
  }

  _consumeVTT(vtt: string): void {
    const parser = new WebVTTParser();
    const tree = parser.parse(vtt);
    const cues = tree.cues.flatMap(cue => {
      const recurse = (nodes: VTTNode[], cb: (text: string) => void) => {
        nodes.forEach(node => {
          if (node.type === 'text') {
            cb(node.value);
          } else if (node.type === 'object') {
            recurse(node.children, cb);
          }
        });
      };
      let text = '';
      recurse(cue.tree.children, t => {
        text += t;
      });
      const lines = text
        .split(/\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);

      return lines.map(line => ({
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
        curr: '',
        cues: <Cue[]>[],
      }
    );

    this.vttCues = dedupedCues;
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (!this.videoId) {
      console.error('videoId attribute required', this);
    }

    if (!this.vttSource) {
      console.error('vttSource attribute required', this);
    }

    if (typeof YT !== 'undefined') {
      YT.ready(() => {
        this._setupPlayer();
      });
    } else {
      const existingReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        existingReady?.();
        this._setupPlayer();
      };
    }

    this._fetchVTT().then(vtt => {
      this._consumeVTT(vtt);
    });
  }

  _onClick(ev: MouseEvent) {
    const cueTime = (ev.target as HTMLElement)?.dataset?.cueTime;
    if (cueTime) {
      const t = decodeTime(cueTime);
      if (t) {
        this.player?.seekTo(t);
      }
    }
  }

  render() {
    const youtubeIframeScript = document.createElement('script');
    youtubeIframeScript.setAttribute(
      'src',
      'https://www.youtube.com/iframe_api'
    );

    // https://lit.dev/docs/v1/components/templates/
    return html`
      <iframe
        class="player"
        width="560"
        height="315"
        src="${`https://www.youtube.com/embed/${this.videoId}?enablejsapi=1`}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div class="transcript">
        ${this.vttCues?.map(
          cue =>
            html`<button
              data-cue-time="${formatTime(cue.time)}"
              part="cue"
              @click=${this._onClick}
            >
              ${cue.text}
            </button>`
        )}
      </div>
      ${youtubeIframeScript}
    `;
  }
}
