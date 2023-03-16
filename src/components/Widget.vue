<template>
  <div :style="{ color: theme.color }">{{ message }}</div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, computed, Ref } from 'vue';

export default defineComponent({
  props: {
    message: {
      type: String,
      default: '',
    },
    theme: {
      type: Object as PropType<{ color: string }>,
      default: () => ({ color: 'inherit' }),
    },
    onInit: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
    onDestroy: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
  },
  setup(props) {
    const injectedMessage = inject('message') as Ref<string> | undefined;
    const injectedTheme = inject('theme') as Ref<{ color: string }> | undefined;
    const onInit = inject('onInit') as (() => void) | undefined;
    const onDestroy = inject('onDestroy') as (() => void) | undefined;

    const message = computed(() => injectedMessage?.value || props.message);
    const theme = computed(() => injectedTheme?.value || props.theme);

    (onInit || props.onInit)();

    return {
      message,
      theme,
    };
  },
});
</script>
