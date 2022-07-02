import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { YoutubeTranscriptionPlayer } from '../src/YoutubeTranscriptionPlayer.js';
import '../src/youtube-transcription-player.js';

describe('YoutubeTranscriptionPlayer', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<YoutubeTranscriptionPlayer>(
      html`<youtube-transcription-player></youtube-transcription-player>`
    );

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<YoutubeTranscriptionPlayer>(
      html`<youtube-transcription-player></youtube-transcription-player>`
    );
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<YoutubeTranscriptionPlayer>(
      html`<youtube-transcription-player
        title="attribute title"
      ></youtube-transcription-player>`
    );

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<YoutubeTranscriptionPlayer>(
      html`<youtube-transcription-player></youtube-transcription-player>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
