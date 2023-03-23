/*
 * @Author: kevin
 * @Date: 2022-02-21 11:54:16
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-23 12:27:03
 * @Description: 配置文件
 */

  const NodePolyfillPlugin = require('node-polyfill-webpack-plugin') // 针对webpack5 的设置

// const targetIp = 'http://192.168.1.166:11006'
const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const isProd = process.env.NODE_ENV === 'production'
const assetsCDN = {
  // webpack build externals
  externals: {
    // vue: 'Vue',
    // 'vue-router': 'VueRouter',
    // vuex: 'Vuex',
    // axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: []
}
module.exports = defineConfig({
  publicPath: '/',
  transpileDependencies: true,
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      // AutoImport({
      //   resolvers: [ElementPlusResolver()]
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()]
      // })
      new NodePolyfillPlugin()
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {},
    resolve: {
      fallback: { path: require.resolve('path-browserify') }
    }
    // target: 'node'
  },
  devServer: {
    port: 8082,
    proxy: {
      '/api/process/': {
        target: 'http://192.168.1.91:13011',
        changeOrigin: true
      },
      '/api': {
        target: process.env.VUE_APP_API_BASE_URL,
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          // '^/api': '' // 需要rewrite的,
        }
      },
      
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
    .set('@', resolve('src'))
    .set('@util', resolve('src/utils'))
    .set('@store', resolve('src/store'))
    .set('@assets', resolve('src/assets'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },
  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined
  // babel-loader no-ignore node_modules/*
})
