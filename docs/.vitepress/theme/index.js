import { watch } from 'vue'
import Layout from './Layout.vue'
import store, { storeKey } from '../store/store.ts'

export default {
  Layout,
  NotFound: () => 'custom 404',
  enhanceApp({ app, router }) {
    app.provide(storeKey, store)
    if (globalThis && globalThis.gtag) {
      // パスを監視
      watch(router.route, () => {
        // Google Analytics
        gtag('config', window.GA_MEASUREMENT_ID, { page_path: router.route.path })

        // worksのページを開いた時はモーダルで表示する
        if (router.route.path !== '/') {
          store.showWorks()
        } else {
          store.hideWorks()
        }
      })
    }
  },
}
