/* eslint-disable no-unused-vars */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CleanWebpackPlugin       = require('clean-webpack-plugin')
const colors                   = require('colors')
const CopyWebpackPlugin        = require('copy-webpack-plugin')
const DashboardPlugin          = require('webpack-dashboard/plugin')
const emoji                    = require('node-emoji')
const FaviconsWebpackPlugin    = require('favicons-webpack-plugin')
const fs                       = require('fs')
const HtmlWebpackPlugin        = require('html-webpack-plugin')
const MiniCssExtractPlugin     = require('mini-css-extract-plugin')
const path                     = require('path')
const PreloadWebpackPlugin     = require('preload-webpack-plugin')
const UglifyJsPlugin           = require('uglifyjs-webpack-plugin')
const webpack                  = require('webpack')
const WorkboxPlugin            = require('workbox-webpack-plugin')

const CONFIG                   = require('./config/global')

const DEST_DIR                 = path.resolve(__dirname, './public')
const ROOT_DIR                 = path.resolve(__dirname, './')
const SOURCE_DIR               = path.resolve(__dirname, './client')

process.env.NODE_ENV           = process.env.NODE_ENV || 'production'

const ENV   = process.env.NODE_ENV
const isDev = ENV !== 'production'
const PORT  = CONFIG.port;

class Reporter {
  apply(compiler) {

    if (isDev) {
      compiler.hooks.done.tap('Reporter', () => {
        setTimeout(() => {
          const host = `https://localhost:${PORT}`.yellow
          console.log(`\n${emoji.get('zap')} Project is running at ${host} ${emoji.get('zap')}\n`);
        }, 500)
      });
    }

  }
}

const WP_CONFIG = {
  entry: `${SOURCE_DIR}/App.js`,
  mode: ENV,
  devtool: ENV === 'development' ? 'cheap-module-eval-source-map' : 'source-map',
  watch: ENV === 'development',
  output: {
    path: DEST_DIR,
    filename: '[name].js',
    publicPath: '/'
  },
  stats: ENV === 'development' ? 'minimal' : 'verbose',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    port: PORT,
    open: false,
    compress: true,
    contentBase: `${ROOT_DIR}/static`,
    historyApiFallback: true,
    stats: 'errors-only',
    https: {
      key: fs.readFileSync('./localhost+1-key.pem'),
      cert: fs.readFileSync('./localhost+1.pem')
    },
    proxy: {
      '/api': {
        target: 'https://[::1]:1981',
        secure: false
      }
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 5,
          output: {
            comments: false,
            beautify: false
          },
          ie8: false
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin([DEST_DIR]),
    new HtmlWebpackPlugin({
      inject: false,
      template: `${ROOT_DIR}/static/template.html`,
      favicon: `${ROOT_DIR}/static/favicon.png`
    }),
    new FaviconsWebpackPlugin({
      logo: `${ROOT_DIR}/static/favicon.png`,
      prefix: 'icons/',
      emitStats: false,
      // statsFilename: 'iconstats-[hash].json',
      name: CONFIG.appName,
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: `${ROOT_DIR}/static`,
        to: './',
        ignore: ['template.html']
      }
    ]),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new PreloadWebpackPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new WorkboxPlugin.InjectManifest({
      swSrc: `${SOURCE_DIR}/Util/ServiceWorker.js`,
      swDest: 'sw.js',
      excludeChunks: ['chunk-name-1', 'chunk-name-2']
    }),
    new DashboardPlugin(),
    new Reporter(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
      reportFilename: 'package-stats.html',
      statsFilename: 'package-stats.json'
    })
  ]
}

module.exports = WP_CONFIG
