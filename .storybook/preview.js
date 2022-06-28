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
  template: '<Context :overridepartner="context.partner" static="staticValue" ><story/></Context>'
})

import Suspense from '../src/components/Suspense.vue';
const SuspenseDecorator = () => ({
  components: { Suspense },
  template: '<Suspense><story/></Suspense>'
})

export const decorators = [ ContextDecorator, SuspenseDecorator ];

export const globalTypes = {
  partner: {
    name: 'partner',
    description: 'Internationalization locale',
    defaultValue: 'bionic',
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
