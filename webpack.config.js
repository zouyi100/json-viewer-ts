

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const loaders = {
  rules: [
    {
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    }
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    return {
      mode: 'production',
      entry: './src/JsonViewer.ts',
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
      output: {
        filename: 'JsonViewer.min.js',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'lib'),
      },
      module: loaders,
    }
  }

  return {
    mode: 'development',
    entry: './src/index.ts',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
    },
    module: loaders,
    devtool: 'inline-source-map',
    devServer: {
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
  }

};
