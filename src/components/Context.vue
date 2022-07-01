<script setup>
import './partners/bionic.scss';
import './partners/default.css';
import './partners/moneysupermarket.css';

import { provide, readonly, reactive, onServerPrefetch, onBeforeMount }  from 'vue';

const props = defineProps([
  'overridepartner',
  'static'
])

/* const httpBinResponse = { */
/*   "partner": props.overridepartner */
/* } */
/* const response = await fetch(`https://httpbin.org/post`, { */
/*   method: 'POST', */
/*   headers: { */
/*     'Content-Type': 'application/json' */
/*   }, */
/*   body: JSON.stringify(httpBinResponse) */
/* }); */
/* const json = await response.json(); */
/* const state = reactive({ */
/*   partner: json.json.partner, */
/* }) */

const context = reactive({});

onServerPrefetch(async () => {
  context.partner = "sent from server";
  console.log('server thing')
});

/* onMounted(async () => { */
/*   context.partner = 'web ish' */
/* }) */

(async () => {
  console.log(context);
  if (!context.partner) {
    console.log('top level await')
    context.partner = "sent from web";
  }
})();

/* onBeforeMount(async () => { */
/*   if (!context.partner) { */
/*     console.log('client side fetch') */
/*     context.partner = await (async() => 'sent from client' )(); */
/*   } */
/* }); */


// dont actually need this
provide('context', readonly(context));
</script>

<template>
  <div :class="`partner--${context.partner}`">
    <slot></slot>
  </div>
</template>
