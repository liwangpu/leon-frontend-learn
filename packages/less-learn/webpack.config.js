const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    clean: true,
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
                // 学习项目为了直观一些,就不加hash,但是不加又分不出:gloabl()效果,所以可以直接写出固定值
                localIdentName: "[local]--HASH",
                // 下面这种是不加hash的
                // localIdentName: "[local]",
              },
            }
          },
          { loader: "less-loader", options: { sourceMap: false } },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: '代码分隔',
      template: './public/index.html'
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    // compress: true,
    port: 9000,
  },
};