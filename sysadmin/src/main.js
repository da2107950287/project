// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
axios.defaults.baseURL = "http://localhost:81"
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (to.path === '/' || token) {
    next();
  } else {
    next('/');
  }
});
/* eslint-disable no-new */
// axios.interceptors.request.use(
//   config => {
//     // if (localStorage.getItem("token")) {
//     //   config.headers.authorization = localStorage.getItem("token");
//     // }
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


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
