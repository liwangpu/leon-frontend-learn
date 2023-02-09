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
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  };
};