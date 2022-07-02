declare module 'webvtt-parser' {
  export type VTTNode =
    | {
        type: 'text';
        value: string;
      }
    | {
        type: 'timestamp';
        value: number;
      }
    | {
        type: 'object';
        children: VTTNode[];
      };

  export interface VTTCue {
    text: string;
    startTime: number;
    tree: {
      children: VTTNode[];
    };
  }

  export class WebVTTParser {
    parse(vtt: string): { cues: VTTCue[] };
  }

  global {
    interface Window {
      WebVTTParser: typeof WebVTTParser;
    }
  }
}
