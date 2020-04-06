import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    { path: '/', name: 'login', meta: { title: "登录" }, component: () => import('@/components/login') },
    { path: '/test1', name: 'test1', meta: { title: "登录" }, component: () => import('@/components/test1') },
   
    {
      path: '/home', name: 'home', meta: { title: "主页" }, component: () => import('@/components/home'),
      children: [
        { path: '/studentList', name: 'studentList', meta: { title: "学生列表" }, component: () => import('@/components/userInformation/student/studentList') },
        { path: '/studentInfo', name: 'studentInfo', meta: { title: "学生列表" }, component: () => import('@/components/userInformation/student/studentInfo') },
        { path: '/companyList', name: 'companyList', meta: { title: "企业列表" }, component: () => import('@/components/userInformation/company/companyList') },
        { path: '/companyInfo', name: 'companyInfo', meta: { title: "企业列表" }, component: () => import('@/components/userInformation/company/companyInfo') },
        { path: '/adminList', name: 'adminList', meta: { title: "企业列表" }, component: () => import('@/components/userInformation/admin/adminList') },
        { path: '/adminInfo', name: 'adminInfo', meta: { title: "企业列表" }, component: () => import('@/components/userInformation/admin/adminInfo') },
        
        { path: '/trainingList', name: 'trainingList', meta: { title: "企业列表" }, component: () => import('@/components/training/trainingList') },
        { path: '/trainingInfo', name: 'trainingInfo', meta: { title: "企业列表" }, component: () => import('@/components/training/trainingInfo') },
        { path: '/consultList', name: 'consultList', meta: { title: "企业列表" }, component: () => import('@/components/consult/consultList') },
        { path: '/consultInfo', name: 'consultInfo', meta: { title: "企业列表" }, component: () => import('@/components/consult/consultInfo') },
        { path: '/recruitmentList', name: 'recruitmentList', meta: { title: "企业列表" }, component: () => import('@/components/recruitment/recruitmentList') },
        { path: '/recruitmentInfo', name: 'recruitmentInfo', meta: { title: "企业列表" }, component: () => import('@/components/recruitment/recruitmentInfo') },
        
      ]
    }

  ]
})
