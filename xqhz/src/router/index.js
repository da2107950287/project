import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
   

    { path: '/login', name: 'login', meta: { title: '登录' }, component: () => import('@/components/login') },
    { path: '/register', name: 'register', meta: { title: '注册' }, component: () => import('@/components/register') },
    {
      path: '/', redirect: '/home', name: 'index', meta: { title: '' ,role:[]}, component: () => import('@/components/index'),
      children: [
        { path: '/home', name: 'home', meta: { title: '首页',role:[]  }, component: () => import('@/components/home') },
        //学生
        { path: '/manageResume', name: 'manageResume', meta: { title: '简历管理', role: ['student'] }, component: () => import('@/components/student/manageResume') },
        // { path: '/resume', name: 'resume', meta: { title: '简历',roles:['0'] },component: () => import('@/components/student/resume') },
        { path: '/personalInfo', name: 'personalInfo', meta: { title: '个人信息', role: ['student'] }, component: () => import('@/components/student/personalInfo') },
        { path: '/manageTrain', name: 'manageTrain', meta: { title: '培训管理', role: ['student'] }, component: () => import('@/components/student/manageTrain') },

        //企业
        { path: '/companyInfo', name: 'companyInfo', meta: { title: '企业信息', role: ['company'] }, component: () => import('@/components/company/companyInfo') },
        { path: '/recruitment', name: 'recruitment', meta: { title: '招聘信息', role: ['company'] }, component: () => import('@/components/company/recruitment') },
        { path: '/training', name: 'training', meta: { title: '培训信息', role: ['company'] }, component: () => import('@/components/company/training') },
        { path: '/resumelist', name: 'resumelist', meta: { title: '简历管理', role: ['company'] }, component: () => import('@/components/company/resumelist') },
        { path: '/recruitmentInfo', name: 'recruitmentInfo', meta: { title: '招聘信息详情', role: ['company', 'student', 'admin'] }, component: () => import('@/components/recruitmentInfo') },
        { path: '/recruitmentList', name: 'recruitmentList', meta: { title: '培训信息详情', role: ['company', 'student', 'admin'] }, component: () => import('@/components/recruitmentList') },
        { path: '/showResume', name: 'showResume', meta: { title: '培训信息详情',role: ['company', 'student', 'admin']  }, component: () => import('@/components/showResume') },


        { path: '/trainingInfo', name: 'trainingInfo', meta: { title: '培训信息详情',role: [] }, component: () => import('@/components/trainingInfo') },
        { path: '/trainingList', name: 'trainingList', meta: { title: '培训信息列表',role: []  }, component: () => import('@/components/trainingList') },

        //学校简介
        { path: '/profile', name: 'profile', meta: { title: '学校简介', role: ['company', 'student', 'admin'] }, component: () => import('@/components/school/profile') },
        //咨询
        { path: '/consult', name: 'consult', meta: { title: '咨询', role: [] }, component: () => import('@/components/consult') },


      ]
    },
    {
      path: '/sysadminindex', name: 'sysadminindex', meta: { title: "主页" }, component: () => import('@/components/sysadminIndex'),
  
       
        children: [
          { path: '/sysadminhome', name: 'sysadminhome', meta: { title: "主页",role:["admin"] }, component: () => import('@/components/sysaminHome')},
          { path: '/sysadminStudentList', name: 'sysadminStudentList', meta: { title: "学生列表",role:["admin"]  }, component: () => import('@/components/userInformation/student/studentList') },
          { path: '/sysadminStudentInfo', name: 'sysadminStudentInfo', meta: { title: "学生详情",role:["admin"]  }, component: () => import('@/components/userInformation/student/studentInfo') },
          { path: '/sysadminCompanyList', name: 'sysadminCompanyList', meta: { title: "企业列表",role:["admin"]  }, component: () => import('@/components/userInformation/company/companyList') },
          { path: '/sysadminCompanyInfo', name: 'sysadminCompanyInfo', meta: { title: "企业列表",role:["admin"]  }, component: () => import('@/components/userInformation/company/companyInfo') },
          { path: '/sysadminAdminList', name: 'sysadminAdminList', meta: { title: "企业列表",role:["admin"]  }, component: () => import('@/components/userInformation/admin/adminList') },
          { path: '/sysadminAdminInfo', name: 'sysadminAdminInfo', meta: { title: "企业列表",role:["admin"]  }, component: () => import('@/components/userInformation/admin/adminInfo') },
          { path: '/sysadminTrainingList', name: 'sysadminTrainingList', meta: { title: "企业列表" ,role:["admin"] }, component: () => import('@/components/training/trainingList') },
          { path: '/sysadminTrainingInfo', name: 'sysadminTrainingInfo', meta: { title: "企业列表",role:["admin"]  }, component: () => import('@/components/training/trainingInfo') },
          { path: '/sysadminConsultList', name: 'sysadminConsultList', meta: { title: "企业列表",role:["admin"]  }, component: () => import('@/components/consult/consultList') },
          // { path: '/sysadminConsultInfo', name: 'sysadminConsultInfo', meta: { title: "企业列表",role:["admin"]  }, component: () => import('@/components/consult/consultInfo') },
          { path: '/sysadminRecruitmentList', name: 'sysadminRecruitmentList', meta: { title: "企业列表" ,role:["admin"] }, component: () => import('@/components/recruitment/recruitmentList') },
          { path: '/sysadminRecruitmentInfo', name: 'sysadminRecruitmentInfo', meta: { title: "企业列表",role:["admin"]  }, component: () => import('@/components/recruitment/recruitmentInfo') },
  
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