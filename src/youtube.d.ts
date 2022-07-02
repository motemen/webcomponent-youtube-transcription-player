interface Window {
  onYouTubeIframeAPIReady: () => void | undefined;
}

declare module YT {
  class Player {
    constructor(element: string | HTMLElement, options: any);

    seekTo(t: number): void;
  }

  function ready(callback: () => void): void;
}
