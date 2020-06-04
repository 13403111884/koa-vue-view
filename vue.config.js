const path = require('path')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'
const isDev = process.env.NODE_ENV !== 'production'

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: isDev ? 'http://localhost:10080' : 'http://localhost:3000',

  devServer: {
    host: '0.0.0.0',
    port: 10080,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '^/client': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '^/business': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },

  css: {
    extract: process.env.NODE_ENV === 'production',
  },

  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    devtool: 'source-map',
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    externals: TARGET_NODE
      ? nodeExternals({
        whitelist: [/\.css$/]
      })
      : undefined,
    optimization: {
      splitChunks: TARGET_NODE ? false : undefined
    },
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),

  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return merge(options, {
          optimizeSSR: false
        })
      })

    if (TARGET_NODE) {
      config.plugins.delete("hmr");
    }

    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/util/request.js'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'))
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [
        resolve('./src/assets/styles/varibles.styl')
      ]
    },
    webpackBundleAnalyzer: {
      openAnalyzer: false,
      analyzerPort: '9001'
    }
  }
}
