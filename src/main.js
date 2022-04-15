import Vue from 'vue'
import App from './App.vue'
//引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入弹窗
import { message } from "@/utils/message"
Vue.prototype.$message = message;
//引入vuex
import store from "@/store/index"

// 引入vue-router
import router from "@/router/index"

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
