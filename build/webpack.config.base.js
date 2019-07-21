'use strict'

// HtmlWebpackPlugin
// 该插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包。如果你有任何CSS assets 在webpack的输出中（例如， 利用 MiniCssExtractPlugin 提取CSS）， 那么这些将被包含在HTML head中的<link>标签内。
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将单个文件或整个目录复制到构建目录.
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 加载和转译 Vue 组件
const { VueLoaderPlugin } = require('vue-loader')

const utils = require('./utils')

module.exports = {
  // 入口文件,需要配置为相应的入口文件
  entry: './src/index.js',
  resolve: {
    // 自动解析确定的扩展。能够使用户在引入模块时不带扩展
    extensions: ['.js', '.vue', '.json'],
    // 创建 import 或 require 的别名，来确保模块引入变得更简单。
    alias: {
      'assets': utils.resolve('assets'),
      'pages': utils.resolve('src/pages'),
      'static': utils.resolve('static'),
      'components': utils.resolve('src/components'),
      'vue$': 'vue/dist/vue.runtime.esm.js'
    }
  },

  module: {
    rules: [
        {
          test: /\.less$/,        
          // loader: "style-loader!css-loader!less-loader",  
          use:[
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ]      
        },
       {
        test: /\.vue$/,
        // use: 'vue-loader'
        use:{
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        }
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          // 将文件加载为base64编码的URL
          loader: 'url-loader',
          options: {
            // limit: 10000,
            // 不编码为base64加快编译速度
            limit: 1,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            // 不编码为base64加快编译速度
            limit: 1,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            // 不编码为base64加快编译速度
            limit: 1,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // 入口文件记得修改 mfg
      template: 'index.html',
      inject: true
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      // 这里需要修改 mfg
      // from: utils.resolve('static/img'),
      // to: utils.resolve('dist/static/img'),
      from: utils.resolve('static/'),
      to: utils.resolve('dist/static/'),
      // 目录拷贝
      toType: 'dir'
    }])
  ]
}
