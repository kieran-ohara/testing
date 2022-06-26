<script setup>
import { provide, readonly, reactive } from 'vue';
const props = defineProps([
  'contextpartner',
  'static'
])

const response = await fetch(`http://localhost:3000`);
const json = await response.json();

const state = reactive({
  partner: json.partner,
  contextPartner: props.contextpartner
})
provide('context', readonly(state));
console.log(`static prop is: ${props.static}`);
console.log(`context partner is: ${props.contextpartner}`);
</script>

<template>
  <slot></slot>
</template>
