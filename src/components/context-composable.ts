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

function objectEmpty(obj: object): boolean {
  return (
    obj
    && Object.keys(obj).length === 0
    && Object.getPrototypeOf(obj) === Object.prototype
  )
}

let memiozedContext = null;

export default async function useContext(): Promise<contextInterface> {

  if (memiozedContext !== null) {
    console.log('Using Memiozed Context')
    return memiozedContext;
  }

  const context = inject('context');
  if (!objectEmpty(context)) {
    console.log('Using Server-Rendered Context')
    memiozedContext = readonly(context);
    return memiozedContext;
  }

  if (!import.meta.env.SSR) {
    console.log('Using Remote Context')
    memiozedContext = readonly(reactive(await fetchContextClient()));
    return memiozedContext;
  }
}
