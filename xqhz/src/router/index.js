import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', name: 'login', meta: { title: '登录' }, component: () => import('@/components/login') },
    { path: '/register', name: 'register', meta: { title: '注册' }, component: () => import('@/components/register') },
    { path: '/showRecruitmentInfo', name: 'showRecruitmentInfo', meta: { title: '招聘信息详情' }, component: () => import('@/components/showRecruitmentInfo') },
    
    {
      path: '/', redirect: '/home', name: 'index', meta: { title: '' }, component: () => import('@/components/index'), children: [
        { path: '/home', name: 'home', meta: { title: '首页' }, component: () => import('@/components/home') },
        { path: '/resume', name: 'resume', meta: { title: '简历',role:['student'] },component: () => import('@/components/student/resume') },
        // { path: '/resume', name: 'resume', meta: { title: '简历',roles:['0'] },component: () => import('@/components/student/resume') },
        { path: '/personalInfo', name: 'personalInfo', meta: { title: '简历',role:['student'] },component: () => import('@/components/student/personalInfo') },
        
        { path: '/m', name: 'm', meta: { title: '简历',role:['company'] },component: () => import('@/components/m') },
        { path: '/recruitment', name: 'recruitment', meta: { title: '招聘信息',role:['company']},component: () => import('@/components/company/recruitment') },
        { path: '/training', name: 'training', meta: { title: '培训信息',role:['company']},component: () => import('@/components/company/training') },
        { path: '/resumelist', name: 'resumelist', meta: { title: '简历管理',role:['company']},component: () => import('@/components/company/resumelist') },
        { path: '/profile', name: 'profile', meta: { title: '学校简介'},component: () => import('@/components/school/profile') },
        

      ]
    }

  ],

})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('token');
//   let role=localStorage.getItem("role")
//   if (to.path === '/login'||to.path==='/home'||to.path==='/register') {
//     next();
//   } else {
   
//     if (token === null || token === '') {
//       next('/login');
//     } else {
//       if (to.meta.role.length !== 0) {
//         for (let i = 0; i < to.meta.role.length; i++) {
//           if (role === to.meta.role[i]) {
//             next()
//             break;
//           } else{
//             console.log("你没有权限访问");
//           }
//         }
//     }
//     }
//   }
//    /* 如果本地存在token,则不允许直接跳转到登录页面 */
//   //  if (to.fullPath === '/login') {
//   //   if (token) {
//   //     next({
//   //       path: from.fullPath
//   //     })
//   //   } else {
//   //     next()
//   //   }
//   // }
// });
export default router;