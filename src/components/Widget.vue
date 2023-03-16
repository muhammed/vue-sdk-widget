<template>
  <div :style="{ color: theme.color }">{{ message }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    message: {
      type: String,
      default: '',
    },
    theme: {
      type: Object,
      default: () => ({ color: 'inherit' }),
    },
    onInit: {
      type: Function,
      default: () => {},
    },
    onDestroy: {
      type: Function,
      default: () => {},
    },
  },
  mounted() {
    console.log({theme: this.theme})
    this.onInit();
  },
});
</script>
