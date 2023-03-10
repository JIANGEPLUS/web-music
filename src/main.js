import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入element
// 使用cdn加速导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
// 让vue应用element
import axios from 'axios';
import '@/icons/iconfont/iconfont.css'
import {numberFormat} from '@/api/api_main'
import store from './store'
// import '@/assets/font/font.css'
// 设置baseurl做前缀
// axios.defaults.baseURL='http://120.79.228.172:3000'
axios.defaults.baseURL='http://localhost:8080'

// axios.create({
//   baseURL:'http://120.79.228.172:3000',
//   // withCredentials: true
// })
Vue.prototype.$http=axios
Vue.prototype.$numberFormat=numberFormat
Vue.use(ElementUI);
Vue.config.productionTip = false


new Vue({
  router,
  // 把vuex共享数据挂载到vue实例中
  store,
  render: h => h(App)
}).$mount('#app')
