declare module "webvtt-parser" {
  export class WebVTTParser {
    parse(vtt: string): { cues: VTTCue[] };
  }

  export interface VTTCue {
    text: string;
    startTime: number;
    tree: {
      children: VTTNode[];
    };
  }

  export type VTTNode =
    | {
        type: "text";
        value: string;
      }
    | {
        type: "timestamp";
        value: number;
      }
    | {
        type: "object";
        children: VTTNode[];
      };

  const parser = new WebVTTParser();

  // Convert stdin to string
  const input = readFileSync(process.stdin.fd, "utf8");

  const tree = parser.parse(input) as unknown as { cues: VTTCue[] };

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
      cues: <
        {
          time: number;
          text: string;
        }[]
      >[],
    }
  );

  console.log(dedupedCues);

  for (const cue of dedupedCues) {
    console.log(`<span data-cue-time="${cue.time}">${cue.text}</span>`);
  }

  interface VTTCue {
    text: string;
    startTime: number;
    tree: {
      children: VTTNode[];
    };
  }

  type VTTNode =
    | {
        type: "text";
        value: string;
      }
    | {
        type: "timestamp";
        value: number;
      }
    | {
        type: "object";
        children: VTTNode[];
      };
}
