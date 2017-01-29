'use strict';
import Webpack from 'webpack';
import Merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import Path from 'path';
import PostCSS from './postcss.config';


const isProdEnv = (process.env.NODE_EV === 'production');
  console.log(`Node environment:\t${isProdEnv}`);

const VENDOR_LIBS = [
  'body-parser',
  'lodash',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux'
];

const BASE_CONFIG = {
  entry: {
    // 'webpack/hot/dev-server',
    bundle: Path.resolve(__dirname, 'src/App'),
    vendor: VENDOR_LIBS
  },
  output: {
    path: Path.join(__dirname, 'dist'),
    filename: '[name].[hash].js'
    // publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /(node_modules|bower_components)/,
        use: 'babel'
      }, {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css'
        })
      }, {
        test: /\.(scss|sass)$/i,
        loaders: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: ['css', 'postcss', 'sass']
        })
        // [
        //   'style',
        //   'css',
        //   'autoprefixer?browsers=last 3 versions',
        //   'sass?outputStyle=expanded'
        // ]
      }, { 
        test: /\.json$/i, 
        use: 'json'
      }, {
        test: /\.(bmp|gif|jpe?g|png|svg|ttif)$/i,
        use: [
          // {
          //   loader: 'url',
          //   options: { limit: 40000 }
          // },
          'file?name=/images/[name].[ext]',
          'image-webpack'
        ]
      }, {
        test: /\.(pdf|doc[mstx]?|ppt[mstx]?|od[fpst])$/i,
        use: 'file?name=/docs/[name].[ext]'
      }
    ]
  },
  plugins: [
    new Webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        postcss: { PostCSS }
      }
    }),
    new ExtractTextPlugin('styles.css'),
    new HTMLWebpackPlugin({
      template: 'assets/index.html'
    })
  ],
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  cache: true,
  watch: true,
  devtool: `${isProdEnv ? 'inline' : 'cheap-eval'}-source-map`,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  }
};

const DEV_SERVER = {
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // contentBase: __dirname,
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    inline: true,
    noInfo: false,
    port: 3000
  },
  stats: {
    assets: true,
    children: false,
    chunks: false,
    colors: {
      bold: '\u001b[1m',
      cyan: '\u001b[1m\u001b[36m',
      green: '\u001b[1m\u001b[32m',
      magenta: '\u001b[1m\u001b[35m',
      red: '\u001b[1m\u001b[31m',
      yellow: '\u001b[1m\u001b[33m'
    },
    errorDetails: true,
    hash: false,
    modules: false,
    publicPath: false,
    reasons: true,
    timings: true,
    version: false,
    warnings: true
  }
};

const AGGREGATE_CONFIG = isProdEnv
  ? BASE_CONFIG
  : Merge(BASE_CONFIG, DEV_SERVER);

export default AGGREGATE_CONFIG;

//   watch: true,
//   devtool: 'cheap-module-eval-source-map',
//   devServer: {
//     colors: true,
//     contentBase: __dirname,
//     noInfo: false,
//     hot: true,
//     inline: true,
//     port: 3000,
//     historyApiFallback: true,
//     host: 'localhost'
//   },
//   plugins: [
//     new Webpack.DefinePlugin({
//       'process.env': {
//         'NODE_ENV': JSON.stringify('production')
//       }
//     }),
//     new Webpack.HotModuleReplacementPlugin(),
//     new Webpack.optimize.DedupePlugin(),
//     new Webpack.optimize.UglifyJsPlugin({
//       compress: { warnings: false },
//       output: { comments: false },
//       sourceMap: false
//     })
//   ],
//   stats: {
//     colors: true,
//     modules: true,
//     reasons: true,
//     errorDetails: true
//   },
//   resolve: {
//     extensions: ['', '.js', '.jsx']
//   }
// };

// module.exports = require('webpack.config.js');
