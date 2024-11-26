const rollup = require('rollup');
const typescript = require('@rollup/plugin-typescript');
// import rollup from 'rollup';
// import typescript from "@rollup/plugin-typescript";

const watchOptions = {
  input: 'src/main.ts',
  output: {
    file: './dist/bundle.js',
    format: 'es',
    sourcemap: false,
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    })
  ]
}
const watcher = rollup.watch(watchOptions);

console.log('Rollup is watching for changes...');

watcher.on('event', event => {
  switch (event.code) {
    case 'START':
      console.info('Rebuilding...');
      break;
    case 'BUNDLE_START':
      console.info('Bundling...');
      break;
    case 'BUNDLE_END':
      console.info('Bundled!');
      break;
    case 'END':
      console.info('Done!');
      break;
    case 'ERROR':
    case 'FATAL':
      console.error("Rollup error: ", event);
  }
});

process.on('exit', () => {
  // 停止监听
  watcher.close();
});
