import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { YoutubeTranscriptionPlayer } from '../src/YoutubeTranscriptionPlayer.js';
import '../src/youtube-transcription-player.js';

describe('YoutubeTranscriptionPlayer', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<YoutubeTranscriptionPlayer>(
      html`
        <youtube-transcription-player
          id="el1"
          videoId="kwnLtaVqDi4"
          vttSource="https://gist.githubusercontent.com/motemen/5240bb435d3bbc21379aa3de42ddd987/raw/a55d3bdcde104e85e7da4b0e492f4f08cd140c42/kwnLtaVqDi4.vtt"
        >
        </youtube-transcription-player>
      `
    );

    expect(el.shadowRoot?.querySelector('iframe')).not.to.be.undefined;
  });
});
