import { build } from 'esbuild';
// import { lessLoader } from 'esbuild-plugin-less';
import path from 'path';

build({
  entryPoints: [
    path.resolve(__dirname, 'lib', 'main.ts'),
  ],
  bundle: true,
  outdir: path.resolve(__dirname, '../../dist/esbuild-learn'),
  // plugins: [lessLoader()],
  loader: {
    '.ts': 'ts',
  },
});