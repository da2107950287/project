// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(vueSwiper)//使用插件

axios.defaults.baseURL = "http://localhost:81";
/* eslint-disable no-new */
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.getItem("token")) {
//       config.headers.authorization = localStorage.getItem("token");
//       console.log(localStorage.getItem("token"))
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   })
// // axios 响应拦截器
// axios.interceptors.response.use(response => {
//   return response.data;
// }, function (error) {
//   return Promise.reject(error);
// });
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
