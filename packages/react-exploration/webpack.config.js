const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    entry: {
      index: './src/bootstrap.tsx',
    },
    output: {
      path: path.resolve(__dirname, '../../dist/react-exploration'),
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
    optimization: {
      usedExports: true,
      splitChunks: {
        cacheGroups: {
          venders: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors'
          }
        }
      }
    },
  };
};