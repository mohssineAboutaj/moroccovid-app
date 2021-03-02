import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fortawesome/fontawesome-free/css/all.css";
import router from "./router";
import globalMixins from "./mixins/globalMixins";
import i18n from './i18n'

// use mixins
Vue.mixin(globalMixins);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
