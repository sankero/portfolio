import { watch } from 'vue'
import Layout from './Layout.vue'
import store, { storeKey } from '../store/store.ts'

export default {
  Layout,
  NotFound: () => 'custom 404',
  enhanceApp({ app, router }) {
    app.provide(storeKey, store)
    if (globalThis && globalThis.gtag) {
      // ページ遷移監視
      watch(router.route, () => {
        // Google Analytics
        gtag('config', window.GA_MEASUREMENT_ID, { page_path: router.route.path })

        // storeで監視できるようにパスを渡す
        store.updatePath(router.route.path)
      })
    }
  },
}
