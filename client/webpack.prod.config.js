var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/app/index.jsx'),
    vendor: [
      'flux-react',
      'lodash',
      'react',
      'react-dom',
      'react-router',
      'reactstrap',
      'socket.io-client',
      'webrtc-adapter',
      'react-addons-css-transition-group',
      'react-addons-transition-group'
    ]
  },
  output: {
    filename: '[chunkhash].[name].js',
    path: path.resolve(__dirname, 'dist')
  },

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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(['css'])
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css','sass'])
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=assets/fonts/[hash].[ext]&limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=assets/fonts/[hash].[ext]"
      },
      {
        test: /\.(png|gif|jpg)$/, loader: "url-loader?limit=10000&name=assets/img/[hash].[ext]"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin("assets/style/[contenthash].css", {allChunks: true}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/app/index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        WS_CONNECTION_URL: JSON.stringify(':3000'),
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
