const path = require('path');
const { EsbuildPlugin } = require('esbuild-loader')

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
        type: 'module',
        // libraryTarget: "umd",
        // export: 'default',
      },
    },
    // optimization: {
    //   minimizer: [
    //     new EsbuildPlugin({
    //       target: 'es2015'  // Syntax to transpile to (see options below for possible values)
    //     })
    //   ]
    // },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        // {
        //   // Match `.js`, `.jsx`, `.ts` or `.tsx` files
        //   test: /\.[jt]sx?$/,
        //   loader: 'esbuild-loader',
        //   options: {
        //     // JavaScript version to compile to
        //     target: 'es2015'
        //   }
        // },
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