<script setup>
import { provide, readonly, reactive } from 'vue';
const state = reactive({
  partner: 'moneysupermarket'
})
provide('context', readonly(state));
</script>

<template>
  <slot></slot>
</template>
