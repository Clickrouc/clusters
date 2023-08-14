import 'normalize.css/normalize.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import './main.css'

import { createApp } from 'vue'

import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

import App from './App.vue'

async function initDev() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser.js')

    await worker.start()
  }
}

initDev()
  .then(() => {
    const app = createApp(App)
    app.use(ToastPlugin)
    app.mount('#app')
  })
  .catch(() => {
    console.error('problems on init')
  })
