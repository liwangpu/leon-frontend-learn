import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default {
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
};