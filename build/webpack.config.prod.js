'use strict'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const utils = require('./utils')

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: utils.resolve('dist'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
    // 以下是vuecli3的优化 mfg
    // minimizer: [
    //   {
    //     options: {
    //       test: /\.m?js(\?.*)?$/i,
    //       chunkFilter: () => true,
    //       warningsFilter: () => true,
    //       extractComments: false,
    //       sourceMap: true,
    //       cache: true,
    //       cacheKeys: defaultCacheKeys => defaultCacheKeys,
    //       parallel: true,
    //       include: undefined,
    //       exclude: undefined,
    //       minify: undefined,
    //       terserOptions: {
    //         output: {
    //           comments: /^\**!|@preserve|@license|@cc_on/i
    //         },
    //         compress: {
    //           arrows: false,
    //           collapse_vars: false,
    //           comparisons: false,
    //           computed_props: false,
    //           hoist_funs: false,
    //           hoist_props: false,
    //           hoist_vars: false,
    //           inline: false,
    //           loops: false,
    //           negate_iife: false,
    //           properties: false,
    //           reduce_funcs: false,
    //           reduce_vars: false,
    //           switches: false,
    //           toplevel: false,
    //           typeofs: false,
    //           booleans: true,
    //           if_return: true,
    //           sequences: true,
    //           unused: true,
    //           conditionals: true,
    //           dead_code: true,
    //           evaluate: true
    //         },
    //         mangle: {
    //           safari10: true
    //         }
    //       }
    //     }
    //   }
    // ],
    // splitChunks: {
    //   cacheGroups: {
    //     vendors: {
    //       name: 'chunk-vendors',
    //       test: /[\\\/]node_modules[\\\/]/,
    //       priority: -10,
    //       chunks: 'initial'
    //     },
    //     common: {
    //       name: 'chunk-common',
    //       minChunks: 2,
    //       priority: -20,
    //       chunks: 'initial',
    //       reuseExistingChunk: true
    //     }
    //   }
    // }
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 有问题 mfg?
      filename: 'main.css'
      // 以下是参考
      // filename: 'css/[name].[contenthash:8].css',
      // chunkFilename: 'css/[name].[contenthash:8].css'
    })
  ]
})
