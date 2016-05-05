var path = require('path');
var webpack = require('webpack');


module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // necessary for hot reloading with IE:
    'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    'webpack-hot-middleware/client',
    // your code:
    './src/index'
  ],
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    })

  ],
  // node: {
  //   child_process: 'empty'
  // },
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
