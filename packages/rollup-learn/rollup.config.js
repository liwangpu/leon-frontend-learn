import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
const rollupTypescript = require('@rollup/plugin-typescript');

console.log(`title:`, typeof babel);

export default [
  {
    input: 'lib/main.ts',
    output: {
      file: 'bundle.js',
      format: 'mjs'
    },
    plugins: [
      // resolve(),
      // babel.babel({ babelHelpers: 'bundled' })
      rollupTypescript()
    ]
  }
];