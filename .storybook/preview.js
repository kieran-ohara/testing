export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

import Context from '../src/components/Context.vue';

const ContextDecorator = () => ({
  components: { Context },
  template: '<Context><story/></Context>'
})

export const decorators = [ContextDecorator];
