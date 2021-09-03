import { watch } from 'vue'
import Layout from './Layout.vue'
import store, { storeKey } from '../store/store.ts'

export default {
  Layout,
  NotFound: () => 'custom 404',
  enhanceApp({ app, router }) {
    app.provide(storeKey, store)
    // Google Analytics
    if (globalThis && globalThis.gtag) {
      watch(router.route, () => {
        gtag('config', window.GA_MEASUREMENT_ID, { page_path: router.route.path })
      })
    }
  },
}
