import { createApp, ref } from "vue";
import WidgetComponent from "./Widget.vue";

class Widget {
  el: string;
  initialOptions: any;
  options: any;
  app: any = null;
  instance: any = null;

  constructor({ el, options }: { el: string; options: any }) {
    this.el = el;
    this.initialOptions = {
      message: options.message || "",
      theme: options.theme || { color: "black" },
      onInit: options.onInit || (() => {}),
      onDestroy: options.onDestroy || (() => {}),
    };
    this.setOptions(this.initialOptions);
  }

  setOptions(newOptions: any) {
    this.options = {
      message: ref(newOptions.message),
      theme: ref(newOptions.theme),
      onInit: newOptions.onInit,
      onDestroy: newOptions.onDestroy,
    };
  }

  resetOptions() {
    this.setOptions(this.initialOptions);
  }

  init() {
    const options = this.options;
    const widget = createApp({
      components: { WidgetComponent },
      provide: {
        message: options.message,
        theme: options.theme,
        onInit: options.onInit,
        onDestroy: options.onDestroy,
      },
      template: "<WidgetComponent />",
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

    // Reset the options to their initial values
    this.resetOptions();
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
