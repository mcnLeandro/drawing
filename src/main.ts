import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace/dist/shoelace";
import ShoelaceModelDirective from "@shoelace-style/vue-sl-model";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.63/dist/"
);

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { key, store } from "./store";

const app = createApp(App)
  .use(store, key)
  .use(router)
  .use(ShoelaceModelDirective);
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith("sl-");
app.mount("#app");
