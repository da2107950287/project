import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    { path: '/', name: 'login', meta: { title: "登录" }, component: () => import('@/components/login') },
    { path: '/test', name: 'test', meta: { title: "登录" }, component: () => import('@/components/test') },
    {
      path: '/home', name: 'home', meta: { title: "主页" }, component: () => import('@/components/home'),
      children: [
        { path: '/studentlist', name: 'studentlist', meta: { title: "学生列表" }, component: () => import('@/components/userinformation/student/studentlist') },
        { path: '/companylist', name: 'companylist', meta: { title: "学生列表" }, component: () => import('@/components/userinformation/companylist') },
        
      ]
    }

  ]
})
