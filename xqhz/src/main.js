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
Vue.use(vueSwiper)//使用轮播插件

axios.defaults.baseURL = "http://localhost:81";

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  let role = localStorage.getItem("role")
  if (to.path === '/login' || to.path === '/register') {
    next();
  } else {
    // if (token === null || token === '') {
    //   ElementUI.Message({
    //     message: '对不起，登录后在进行操作！',
    //     type:'warning'
    // });
    // } else {
      //权限
      if (to.meta.role.length !== 0) {
        let arr = to.meta.role.filter((item) => {
          return role === item
        })
      if(arr.length==0){
          ElementUI.Message({
            message: '对不起，你没有权限操作！',
            type:'warning'
        });
        }
        else {
          next();
        }
      }else{
        next()
      }
    // }
  }
});

axios.interceptors.request.use(
  config => {
    if (localStorage.getItem("token")) {
      config.headers.authorization = localStorage.getItem("token");
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
// axios 响应拦截器
axios.interceptors.response.use(response => {
  return Promise.resolve(response.data);
}, function (error) {
  return Promise.reject(error);
});


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
