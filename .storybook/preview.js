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

const ContextDecorator = (story, {globals: context}) => ({
  setup() {
    return {
      context,
    }
  },
  components: { Context },
  template: '<Context :contextpartner="context.partner" static="staticValue" ><story/></Context>'
})

export const decorators = [ContextDecorator];

export const globalTypes = {
  partner: {
    name: 'partner',
    description: 'Internationalization locale',
    defaultValue: 'default',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'default',  title: 'Default' },
        { value: 'bionic',  title: 'Bionic' },
        { value: 'moneysupermarket', title: 'Money Supermarket' },
      ],
    },
  },
};
