var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  target: 'atom',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      electron: 'electron'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        // loaders: ['babel'],
        include: path.join(__dirname, 'src'),
        loader: require.resolve('babel-loader'),
        queries: {
          plugins: ['transform-runtime'],
          presets: ["react", "es2015", "babel-preset-stage-0"],
        },
        exclude: /node_modules/
      },

      {
        test: /\.less$/,
        loader: 'style!css!less',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: ['', '.js', '.min.js', '.json'],
    modulesDirectories: ['node_modules', path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
  },
  resolveLoader: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
  }
};
