<script setup>
import { provide, readonly, reactive } from 'vue';
const props = defineProps([
  'contextpartner',
  'static'
])
const state = reactive({
  partner: 'moneysupermarket',
  contextPartner: props.contextpartner
})
provide('context', readonly(state));
console.log(`static prop is: ${props.static}`);
console.log(`context partner is: ${props.contextpartner}`);
</script>

<template>
  <slot></slot>
</template>
