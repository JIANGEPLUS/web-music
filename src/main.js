import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
// 让vue应用element
import axios from 'axios';
import '@/icons/iconfont/iconfont.css'

// 设置baseurl做前缀
axios.defaults.baseURL='http://120.79.228.172:3000'
// axios.create({
//   baseURL:'http://120.79.228.172:3000',
//   // withCredentials: true
// })
Vue.prototype.$http=axios
Vue.use(ElementUI);
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
