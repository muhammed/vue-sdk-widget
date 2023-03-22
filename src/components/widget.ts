import { createApp, ref } from 'vue';
import WidgetComponent from './Widget.vue';

class Widget {
  el: string;
  options: any;
  app: any = null;
  instance: any = null;
  defaultOptions: any;

  constructor({ el, options }: { el: string; options: any }) {
    this.el = el;
    this.defaultOptions = {
      message: options.message || '',
      theme: options.theme || { color: 'black' },
      onInit: options.onInit || (() => {}),
      onDestroy: options.onDestroy || (() => {}),
      customMessageTypes: options.customMessageTypes || {},
    };
    this.options = {
      message: ref(this.defaultOptions.message),
      customMessageTypes: ref(this.defaultOptions.customMessageTypes),
      theme: ref(this.defaultOptions.theme),
      onInit: this.defaultOptions.onInit,
      onDestroy: this.defaultOptions.onDestroy,
      dynamicComponent: ref(this.defaultOptions.dynamicComponent),
    };
  }

  init() {
    const options = this.options;
    const widget = createApp({
      components: { WidgetComponent },
      template: `<WidgetComponent
        v-model:message="options.message.value"
        v-model:theme="options.theme.value"
        v-model:customMessageTypes="options.customMessageTypes.value"
        :onInit="options.onInit"
        :onDestroy="options.onDestroy"
        :dynamicComponent="options.dynamicComponent.value"
      />`,
      setup() {
        return { options };
      },
    });

    this.app = widget;
    this.instance = widget.mount(this.el);
  }

  destroy() {
    if (this.app) {
      this.app.unmount();
      this.app = null;
      this.instance = null;
    }
    this.resetOptions();
  }

  updateOptions(newOptions: any) {
    for (const key in newOptions) {
      if (key in this.options) {
        this.options[key].value = newOptions[key];
      }
    }
  }

  resetOptions() {
    this.options.message.value = this.defaultOptions.message;
    this.options.theme.value = this.defaultOptions.theme;
    this.options.onInit = this.defaultOptions.onInit;
    this.options.onDestroy = this.defaultOptions.onDestroy;
  }
}

export default Widget;
