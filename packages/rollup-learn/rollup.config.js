import path from 'node:path';
import typescript from 'rollup-plugin-typescript2'
import sourcemaps from 'rollup-plugin-sourcemaps';
import del from 'rollup-plugin-delete';

const outputDir = path.resolve(__dirname, '../../dist/rollup-learn');
console.log(`outputDir:`, outputDir);

export default {
  // input: generateInputs(),
  input: `./lib/index.ts`,
  output: {
    dir: `${outputDir}/lib`,
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
  },
  plugins: [
    del({ targets: outputDir, force: true }),
    // resolve(),
    // babel.babel({ babelHelpers: 'bundled' })
    typescript({
      // declarationDir: 'types',
      declaration: false,
      // rollupCommonJSResolveHack: true,
      // useTsconfigDeclarationDir: true,
    }),
    sourcemaps(),
  ]
};