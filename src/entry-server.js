import { createApp } from './main'

export default async context => {
  return await new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    const { url } = context

    router.push(url)

    return router.onReady(async () => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      await Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
