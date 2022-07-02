import {
  inject,
  readonly,
  reactive,
}  from 'vue';

interface contextInterface {
  partner: string
}

async function fetchContextClient() {
  console.log('executing client fetch');
  const httpBinResponse = {
    "partner": "client-partner",
  }
  const response = await fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(httpBinResponse)
  });
  const json = await response.json();
  return json.json;
}

export default async function useContext(): Promise<contextInterface> {

  const context = inject('context')

  const reactiveContext = reactive({
    partner: context?.partner ?? null
  });

  if(!reactiveContext.partner) {
    if (!import.meta.env.SSR) {
      const { partner: remotePartner } = await fetchContextClient();
      reactiveContext.partner = 'client-value';
    }
  }

  return readonly(reactiveContext);
}
