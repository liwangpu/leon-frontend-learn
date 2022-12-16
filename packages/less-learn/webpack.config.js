const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    index: {
      import: './src/index.js'
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../dist/less-learn'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()],
};