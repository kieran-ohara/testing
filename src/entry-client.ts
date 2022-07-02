const context = window.__CONTEXT;

import createApp from './main.ts';

const { app, router } = createApp()
app.provide('context', context);

// router.isReady().then(() => {
  app.mount('#app');
// })
