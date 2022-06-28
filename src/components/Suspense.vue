<script setup>
import { Suspense } from 'vue';
</script>

<template>
  <Suspense>
    <template #fallback>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </Suspense>
</template>
