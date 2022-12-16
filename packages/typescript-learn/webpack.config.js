const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    entry: {
      index: './src/main.ts',
    },
    output: {
      path: path.resolve(__dirname, '../../dist/typescript-learn'),
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
};