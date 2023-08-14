import 'normalize.css/normalize.css'

import { createApp } from 'vue'
import App from './App.vue'

async function initDev() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser.js')

    await worker.start()
  }
}

initDev()
  .then(() => {
    createApp(App).mount('#app')
  })
  .catch(() => {
    console.error('problems on init')
  })
