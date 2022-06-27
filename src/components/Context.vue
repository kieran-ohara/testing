<script setup>
import './partners/bionic.css';
import './partners/default.css';
import './partners/moneysupermarket.css';

import { provide, readonly, reactive } from 'vue';
const props = defineProps([
  'overridepartner',
  'static'
])

const httpBinResponse = {
  "partner": props.overridepartner
}

const response = await fetch(`https://httpbin.org/post`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(httpBinResponse)
});

const json = await response.json();

const state = reactive({
  partner: json.json.partner,
})
provide('context', readonly(state));
</script>

<template>
  <div :partner="state.partner">
    <slot></slot>
  </div>
</template>
