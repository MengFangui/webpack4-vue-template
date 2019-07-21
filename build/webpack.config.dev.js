'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const utils = require('./utils')

const HOST = 'localhost'
const PORT = 8080

module.exports = merge(baseConfig, {
  mode: 'development',
  // output: {
  //   filename: 'js/[name].[hash].js',
  //   path: path.resolve(__dirname, '../dist'),
  // },
  output: {
    // 此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。
    filename: 'js/[name].js',
    path: utils.resolve('dist'),
  },

  devServer: {
    // 当使用内联模式(inline mode)时，会在开发工具(DevTools)的控制台(console)显示消息，默认就是内联模式
    // devServer.clientLogLevel 可能会显得很繁琐，你可以通过将其设置为 'none' 来关闭 log。
    // 推荐使用 模块热替换 的内联模式，因为它包含来自 websocket 的 HMR 触发器。轮询模式可以作为替代方案，但需要一个额外的入口点：'webpack/hot/poll?1000'。
    // 设置为none，之前是warning
    clientLogLevel: 'none',
    // 启用 webpack 的 模块热替换 功能
    hot: true,
    // 告诉服务器从哪个目录中提供内容。
    contentBase: 'dist',
    // 一切服务都启用 gzip 压缩
    // compress: true,
    compress: false,
    host: HOST,
    port: PORT,
    // 告诉 dev-server 在 server 启动后打开浏览器。
    open: true,
    // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。
    // 默认禁用。
    overlay: { warnings: false, errors: true },
    // 此路径下的打包文件可在浏览器中访问。
    publicPath: '/',
    // 启用 devServer.quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    // 需要设置为false 以显示编译时间
    quiet: false,
    // 一般建议使用cheap-module-eval-source-map，你会看到类似 import {test} from "module"; var A = function(_test) { ... }(test);
    // 但是为了更快的构建速度和重新构建速度，我们改为了none，直接省略devtools
    // devtool: 'cheap-module-eval-source-map',
    // color: true,
    // 设置代理
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
