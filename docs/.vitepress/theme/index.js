import { watch } from 'vue'
import Layout from './Layout.vue'

export default {
  Layout,
  NotFound: () => 'custom 404',
  enhanceApp({ router }) {
    // Google Analytics
    if (globalThis && globalThis.gtag) {
      watch(router.route, () => {
        gtag('config', window.GA_MEASUREMENT_ID, { page_path: router.route.path })
      })
    }
  },
}
