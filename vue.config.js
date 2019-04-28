const webpack = require('webpack')

module.exports = {
  //部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === 'production'
  ? '/movie-recommendation/'
  : '/',
  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: '',
  //指定生成的 index.html 的输出路径 (相对于 outputDir)
  indexPath: 'index.html',
  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,
  //在 multi-page 多页模式下构建应用，每个“page”应该有一个对应的 JavaScript 入口文件
  pages: undefined,
  //是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: true,
  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  //默认情况下 babel-loader 会忽略所有 node_modules 中的文件
  transpileDependencies: [],
  //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,
  //在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,
  //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  configureWebpack: {
    //加载插件
    plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
    ],
    //加载 style-loader, css-loader, file-loader, url-loader
    module: {
      rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
        {
          loader: 'file-loader',
          options: {}
        }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
        ]
      }
      ]
    }
  },
  //配置高于chainWebpack中关于 css-loader 的配置
  css: {
  	//默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块
  	modules: false,
  	//是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)
  	extract: false,
  	//是否为 CSS 开启 source map
  	sourceMap: false,
  	//向 CSS 相关的 loader 传递选项
  	loaderOptions: {
  		css: {
  			//这里的选项会传递给 css-loader
  		}
  	}
  },
  //所有 webpack-dev-server 的选项都支持
  devServer: {
  	//提供在服务器内部的所有其他中间件之前执行自定义中间件的能力
  	before: app => {},
  	//指定要使用的主机
  	host: 'localhost',
  	//devServer.hot在没有页面刷新的情况下启用热模块替换（请参阅）作为构建失败时的后备
  	hotOnly: false,
  	//默认情况下，dev-server将通过HTTP提供
  	https: false,
  	//告诉dev-server在服务器启动后打开浏览器
  	open: true,
  	//指定用于侦听请求的端口号
  	port: 8080,
  	//当您拥有单独的API后端开发服务器并且希望在同一域上发送API请求时，代理某些URL会很有用
  	proxy: null
  },
  //是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require('os').cpus().length > 1,
  //向 PWA 插件传递选项
  pwa: {},
  //这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项
  pluginOptions: {}
}