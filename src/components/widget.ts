import { createApp, ref } from 'vue';
import WidgetComponent from './Widget.vue';

class Widget {
  el: string;
  options: any;
  app: any = null;
  instance: any = null;

  constructor({ el, options }: { el: string; options: any }) {
    this.el = el;
    this.options = {
      message: ref(options.message || ''),
      theme: ref(options.theme || { color: 'black' }),
      onInit: options.onInit || (() => {}),
      onDestroy: options.onDestroy || (() => {}),
    };
  }

  init() {
    const options = this.options;
    const widget = createApp({
      components: { WidgetComponent },
      template: `<WidgetComponent
        v-model:message="options.message.value"
        v-model:theme="options.theme.value"
        :onInit="options.onInit"
        :onDestroy="options.onDestroy"
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
      this.options.onDestroy();
      this.app.unmount();
      this.app = null;
      this.instance = null;
    }
  }

  updateOptions(newOptions: any) {
    for (const key in newOptions) {
      if (key in this.options) {
        this.options[key].value = newOptions[key];
      }
    }
  }
}

export default Widget;
