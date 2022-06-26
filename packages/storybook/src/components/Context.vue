<script setup>
import './context.css';

import { provide, readonly, reactive } from 'vue';
const props = defineProps([
  'overridepartner',
  'static'
])

const response = await fetch(`http://localhost:3000?` + new URLSearchParams({
  overridepartner: props.overridepartner,
}));
const json = await response.json();

const state = reactive({
  partner: json.partner,
})
provide('context', readonly(state));
</script>

<template>
  <div :partner="state.partner">
    <slot></slot>
  </div>
</template>
