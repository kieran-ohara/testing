<script setup>
import { Suspense } from 'vue';
</script>

<template>
  <Suspense>
    <template #fallback>
      <p>loading</p>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </Suspense>
</template>
