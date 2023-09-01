const path = require('path');

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    entry: {
      index: './src/main.js',
    },
    output: {
      path: path.resolve(__dirname, '../../dist/webpack-learn'),
      clean: true,
      library: 'MyLibrary',
      libraryTarget: 'amd',
    },
    module: {
      rules: [
      ]
    },
    plugins: [
    ],
  };
};