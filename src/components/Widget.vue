<template>
  <div :style="{ color: theme.color }">{{ message }}</div>
  dynamic component;
  <component :is="getMessageComponent('ComponentTypeA')" />
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
    customMessageTypes: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getMessageComponent(type: string) {
      return this.customMessageTypes[type] || null;
    },
  },
  mounted() {
    this.onInit();
  },
  beforeUnmount() {
    this.onDestroy();
  },
});
</script>
