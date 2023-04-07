const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    entry: {
      index: './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, '../../dist/webpack-learn'),
      clean: true,
    },
    // target: ['web', 'es5'],
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-typescript",
                ['@babel/preset-env', { targets: "defaults" }],
              ]
            }
          }
        }
      ]
    }
  };
};