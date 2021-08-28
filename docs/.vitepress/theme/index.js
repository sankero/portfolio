import Layout from './Layout.vue'
import { watch } from 'vue'

export default {
  Layout,
  NotFound: () => 'custom 404',
  enhanceApp({ app, router, siteData }) {
    // Google Analytics
    if (globalThis && globalThis.gtag) {
      watch(router.route, () => {
        gtag('config', window.GA_MEASUREMENT_ID, {'page_path': router.route.path });
      })
    }
  }
}
