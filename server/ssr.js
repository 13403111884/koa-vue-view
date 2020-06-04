const Koa = require('koa')
const cors = require('koa2-cors')
const historyApiFallback = require('koa-connect-history-api-fallback');
const proxy = require('koa2-proxy-middleware')
const koaStatic = require("koa-static")
const koaMount = require('koa-mount')
const path = require('path')

const resolve = file => path.resolve(__dirname, file)
const app = new Koa()

const isDev = process.env.NODE_ENV !== 'production'
const router = isDev ? require('./dev.ssr') : require('./server')

app.use(cors())
app.use(proxy({
  targets: {
    '/client/(.*)': {
      // this is option of http-proxy-middleware
      target: 'http://localhost:5000', // target host
      changeOrigin: true, // needed for virtual hosted sites
    },
    '/business/(.*)': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    }
  }
}))
app.use(historyApiFallback({ whiteList: ['/api', '/client', '/business'] }))
app.use(router.routes()).use(router.allowedMethods())
// 开放目录
app.use(koaMount('/', koaStatic(resolve("../dist"))))
app.use(koaMount('/', koaStatic(resolve("../public"))))

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
});

module.exports = app