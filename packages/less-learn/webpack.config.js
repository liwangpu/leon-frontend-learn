const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  devtool: false,
  optimization: {
    minimize: false,
  },
  entry: {
    index: {
      import: './src/index.js'
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../dist/less-learn'),
    clean: false,
    // comments: false,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              modules: {
                // localIdentName: "[local]--[hash:base64:5]",
                // 学习项目为了直观一些,就不加hash
                localIdentName: "[local]",
              },
            }
          },
          { loader: "less-loader", options: { sourceMap: false } },
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()],
};