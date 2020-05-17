import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import feather from "vue-icon";
import { VLazyImagePlugin } from "v-lazy-image";

Vue.use(feather, "v-icon");
Vue.config.productionTip = false;
Vue.use(VLazyImagePlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
