<template>
  <button type="button" :class="classes" @click="onClick" :style="style">{{ label }}</button>
</template>

<script>
import { reactive, computed } from 'vue';
import './button.css';

export default {
  inject: ['context'],
  name: 'my-button',

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': props.primary,
        'storybook-button--secondary': !props.primary,
        [`storybook-button--${props.size || 'medium'}`]: true,
      })),
      onClick() {
        emit('click');
      }
    }
  },
};
</script>
