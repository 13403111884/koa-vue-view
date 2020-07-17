class WebSocketClass {
  constructor (websocketUrl, open) {
    this.websocketUrl = websocketUrl
    open && this.open()
  }
  static getInfo () {
    if (!this.ws) {
      this.ws = new WebSocket(this.websocketUrl)
    }
    return this.ws
  }

  open (start) {
    const { fn, params = {} } = start || {}
    const { send = 'open' } = params
    this.ws = new WebSocket(this.websocketUrl)
    this.ws.onopen = e => {
      this.send(send)
      this.getMessage(fn, e)
    }
  }

  send (ping) {
    if (this.ws.readyState === 1) {
      this.ws.send(ping)
    }
  }

  getMessage (fn) {
    this.ws.onmessage = e => {
      fn && fn(e)
      return e.data
    }
  }

  close (close) {
    if (!this.ws || this.ws.readyState > 1) {
      console.log('连接已经关闭')
      return
    }
    this.ws.send(close || 'close')
    this.ws.close()
  }

  // readyState 状态
  // 0：表示正在连接；
  // 1：表示连接成功，可以通信了。
  // 2：表示连接正在关闭。
  // 3：表示连接已经关闭，或者打开连接失败。

}

export default WebSocketClass

// koa 示例

// const Koa = require('koa');
// const Router = require('koa-router');
// const koaBody = require('koa-body');
// const websockify = require('koa-websocket')
// const app = websockify(new Koa())

// const { mkdirsSync } = require('./utils/dir')
// const router = new Router()
// app.use(koaBody())

// app.ws.use((ctx, next) => {
//   return next(ctx)
// })

// router.all('/websocket', async (ctx, next) => {
//   ctx.websocket.on('message', msg => {
//     setInterval(function() {
//       ctx.websocket.send(`前端发过来的数据: ${msg}`)
//     }, 1000)
//   })
//   ctx.websocket.on('close', () => {
//     console.log('前端关闭了websocket')
//   })
// })

// app.ws.use(router.routes())
// app.use(router.allowedMethods())
// app.use(serve(__dirname + '/static'))
// app.listen(9000, () => {
//   console.log('服务9000端口已经启动了')
// })
