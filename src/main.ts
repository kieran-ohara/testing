import { createSSRApp } from 'vue'
import App from './App.vue'
import { plugin, defaultConfig } from '@formkit/vue'

export default function createApp() {
  const app = createSSRApp(App).use(plugin, defaultConfig)
    //.mount('#app')
  return { app, router: {} };
}

