import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
const path = require('path');
const rollupTypescript = require('@rollup/plugin-typescript');

console.log(`title:`, typeof babel);

export default [
  {
    input: 'lib/main.ts',
    output: {
      // file: 'bundle.js',
      dir: path.resolve(__dirname, '../../dist/rollup-learn'),
      format: 'cjs'
    },
    plugins: [
      // resolve(),
      // babel.babel({ babelHelpers: 'bundled' })
      rollupTypescript()
    ]
  }
];