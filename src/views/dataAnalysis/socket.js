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
    return new Promise((resolve, reject) => {
      const { send = 'open' } = start || {}
      this.ws = new WebSocket(this.websocketUrl)
      if ([0, 1].includes(this.ws.readyState)) {
        this.ws.onopen = e => {
          this.send(send).then(res => {
            resolve({...e, ...res})
          })
        }
      } else {
        reject({ code: 1, mge: 'WebSocket创建失败', data: this.ws })
      }
    })
  }

  send (ping) {
    return new Promise((resolve, reject) => {
      if (this.ws && this.ws.readyState === 1) {
        this.ws.send(ping)
        this.getMessage().then(res => {
          resolve({ code: 0, ...res })
        })
      } else {
        reject({ code: 1, mge: '是否开启链接', data: this.ws })
      }
    })
  }

  getMessage () {
    return new Promise((resolve, reject) => {
      if (this.ws && this.ws.readyState === 3) {
        reject({ code: 1, mge: '是否开启链接', data: this.ws })
      } else {
        this.ws.onmessage = e => {
          resolve({ code: 0, e })
        }
      }
    })
  }

  close (close) {
    return new Promise((resolve, reject) => {
      try {
        if (this.ws && this.ws.readyState < 2) {
          this.ws.send(close || 'close')
          this.ws.close()
        }
        resolve({ code: 0, mge: '连接已经关闭' })
      } catch (error) {
        reject({ code: 1, error })
      }
    })
  }

  // readyState 状态
  // 0：表示正在连接；
  // 1：表示连接成功，可以通信了。
  // 2：表示连接正在关闭。
  // 3：表示连接已经关闭，或者打开连接失败。

}

export default WebSocketClass
