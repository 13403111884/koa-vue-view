const glob = require('glob')

function autoLoad(app, root) {

  // 同步读取root目录下的所有js文件
  glob.sync(`${root}/**/**/*.js`).forEach((file) => {

    // 利用控制器目录结构构和方法构建路由url
    let controller = require(file)
    let routeURL = file.replace(/\.[^.]*$/, '').replace(root.replace(/\\/g, '/'), '')
    let methods = Object.keys(controller)

    function applyMethod(name, methodBody) {
      let body = methodBody
      let method = 'get'
      let handler
      let params
      
      switch (typeof body) {
        case 'function':
          handler = body
          break
        case 'object':
          params = body.params || []
          method = (body.method || 'get').toLowerCase()
          routeURL = routeURL + '/' + params.join('/')
          handler = body.handler
          break
        default: return
      }

      // 绑定路由规则
      app[method](routeURL, handler);
      // 这里兼容访问index的情况
      if (name === 'index') {
        app[method](routeURL + '/index', handler)
      }
    }

    methods.forEach(function (method) {
      let methodName = method
      let methodBody = controller[method]

      applyMethod(methodName, methodBody)
    })
  })
}

module.exports = autoLoad
