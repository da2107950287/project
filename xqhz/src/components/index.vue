<template>
  <div>
    <div class="logo">
      校企合作信息
      <span>管理系统</span>
    </div>
    <!-- <img src="./" alt=""> -->
    <el-menu
      :default-active="this.$route.name"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#1e649f"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <el-menu-item index="home">首页</el-menu-item>
      <el-menu-item index="profile">学校简介</el-menu-item>
      <el-menu-item index="consult">留言咨询</el-menu-item>
      <el-menu-item index="register" v-if="!showStudent&&!showCompany">注册</el-menu-item>
      <el-menu-item index="login" v-if="!showStudent&&!showCompany">登录</el-menu-item>
      <el-submenu index="2" class="right" v-if="showStudent">
        <template slot="title">hi，{{username}}</template>
        <el-menu-item index="personalInfo">个人信息管理</el-menu-item>
        <el-menu-item index="manageResume">简历投递管理</el-menu-item>
        <el-menu-item index="manageTrain">培训报名管理</el-menu-item>
        <el-menu-item @click="loginout">退出登录</el-menu-item>
      </el-submenu>
      <el-submenu index="3" class="right" v-if="showCompany">
        <template slot="title">hi，{{username}}</template>
        <el-menu-item index="companyInfo">企业信息管理</el-menu-item>
        <el-menu-item index="recruitment">招聘管理</el-menu-item>
        <el-menu-item index="training">培训管理</el-menu-item>
        <el-menu-item @click="loginout">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "home",
      username:'',
      
    };
  },
  computed: {
    showStudent() {
     
      this.username=localStorage.getItem("username")
      return  localStorage.getItem('token')&&localStorage.getItem("role") === "student";
    },
    showCompany() {
      this.isShow=false
      this.username=localStorage.getItem("username")
      return  localStorage.getItem('token')&&localStorage.getItem("role") === "company";
    }
  },
  methods: {
    loginout(){
      localStorage.removeItem('token');
      this.$router.push({path:'/home'})
      window.location.reload()
    }
  }
};
</script>
<style lang="scss"  scoped>
.top-img {
  width: 550px;
}
.logo {
  color: rgb(126, 0, 67);
  // background-color: rgb(30, 100, 159);
  font-size: 54px;
  margin: 10px 30px;
  span {
    font-size: 32px;
  }
}
.blank-box {
  height: 60px;
}
.el-menu.el-menu--horizontal {
  padding: 0 150px;
}
.right {
  position: fixed;
  right: 150px;
}
</style>