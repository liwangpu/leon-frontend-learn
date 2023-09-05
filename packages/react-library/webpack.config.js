const path = require('path');

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    entry: {
      index: './lib/index.ts',
    },
    output: {
      path: path.resolve(__dirname, '../../dist/react-library'),
      clean: true,
      library: {
        // name: 'MyLibrary',
        type: 'commonjs',
        // libraryTarget: "commonjs",
        // export: 'default',
      },
    },
    externals: {
      lodash: 'lodash',
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
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
    ],
    experiments: {
      outputModule: true,
    },
  };
};