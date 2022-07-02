const path = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  root: './demo',
  base: '/webcomponent-youtube-transcription-player/',
  build: {
    outDir: path.join(__dirname, 'dist/demo'),
    lib: {
      entry: path.join(__dirname, 'src', 'index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      input: path.join(__dirname, 'demo', 'index.html'),
    },
  },
});
