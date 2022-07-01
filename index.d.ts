import { LitElement } from "lit";
declare module YT {
    class Player {
        constructor(element: string | HTMLElement, options: any);
        seekTo(t: number): void;
    }
    function ready(callback: () => void): void;
}
declare type Cue = {
    time: number;
    text: string;
};
export declare class YouTubeTranscriptionPlayer extends LitElement {
    static styles: import("lit").CSSResult[];
    static globalIndex: number;
    index: number;
    player: YT.Player | undefined;
    videoId: string | null;
    vttSource: string | null;
    vttCues: Cue[] | null;
    constructor();
    _setupPlayer(): void;
    _formatTime(t: number): string;
    _decodeTime(s: string): number;
    _fetchVTT(): Promise<string>;
    _consumeVTT(vtt: string): void;
    get playerElementId(): string;
    connectedCallback(): void;
    _onClick(ev: MouseEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=index.d.ts.map