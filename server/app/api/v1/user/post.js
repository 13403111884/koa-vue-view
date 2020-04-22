// const Router = require('koa-router')
// const router = new Router({
//   prefix: '/v1/user'
// })

// router.post('/add', async (ctx) => {

// })

// module.exports = router
exports.GET = (req, res) => {
  res.send({
    key: 'book'
  })
}

