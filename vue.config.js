const webpack = require('webpack')

module.exports = {
  indexPath: 'index.html',
  filenameHashing: true,
  pages: undefined,
  lintOnSave: true,
  transpileDependencies: [],
  productionSourceMap: false,
  integrity: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  },
  css: {
    extract: false,
    loaderOptions: {
      css: {}
    }
  },
  devServer: {
    before: app => {},
    host: '192.168.199.126',
    hotOnly: false,
    https: false,
    open: true,
    port: 8080,
    proxy: null
  },
  pwa: {},
  pluginOptions: {}
}
