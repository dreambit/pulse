var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'src/app/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  devtool: 'source-map',

  resolve: {
      extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015', "stage-2", 'react']
          }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/app/index.html')
  }),
  new webpack.DefinePlugin({
      WS_CONNECTION_URL: ':3000'
  })]
}
