<script setup>
import './partners/bionic.scss';
import './partners/default.css';
import './partners/moneysupermarket.css';
import useContext from './context-composable';
const context = await useContext();
</script>

<template>
  <div :class="`partner--${context?.partner}`">
    <slot></slot>
  </div>
</template>
