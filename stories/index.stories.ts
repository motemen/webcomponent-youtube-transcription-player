import { html, TemplateResult } from 'lit';
import '../src/youtube-transcription-player.js';

export default {
  title: 'YoutubeTranscriptionPlayer',
  component: 'youtube-transcription-player',
  argTypes: {
    videoId: { control: 'text' },
    vttSource: { control: 'text' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  slot?: TemplateResult;
  videoId?: string;
  vttSource?: string;
}

const Template: Story<ArgTypes> = ({
  slot,
  videoId = 'kwnLtaVqDi4',
  vttSource = 'https://gist.githubusercontent.com/motemen/5240bb435d3bbc21379aa3de42ddd987/raw/a55d3bdcde104e85e7da4b0e492f4f08cd140c42/kwnLtaVqDi4.vtt',
}: ArgTypes) => html`
  <youtube-transcription-player .videoId=${videoId} .vttSource=${vttSource}>
    ${slot}
  </youtube-transcription-player>
`;

export const Regular = Template.bind({
  videoId: 'kwnLtaVqDi4',
  vttSource:
    'https://gist.githubusercontent.com/motemen/5240bb435d3bbc21379aa3de42ddd987/raw/a55d3bdcde104e85e7da4b0e492f4f08cd140c42/kwnLtaVqDi4.vtt',
});
