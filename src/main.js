import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from "./components/common/toast/index";

//1.安装自定义插件toast,他会自动去toast的文件夹的index.js中寻找install方法
Vue.use(toast)

Vue.config.productionTip = false
//增加事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
