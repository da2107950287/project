<template>
  <div>
    <div class="logo">校企合作信息 <span>管理系统</span></div>
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
      <el-submenu index="2" :hide-timeout="5000">
        <template slot="title" >学生</template>
        <el-menu-item index="personalInfo">个人信息</el-menu-item>
        <el-menu-item index="manageResume">招聘管理</el-menu-item>
        <el-menu-item index="manageTrain">培训管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3" :hide-timeout="5000">
        <template slot="title">企业</template>
        <el-menu-item index="companyInfo">企业信息管理</el-menu-item>
        <el-menu-item index="recruitment">招聘管理</el-menu-item>
        <el-menu-item index="training">培训管理</el-menu-item>
        <!-- <el-menu-item index="resumelist">管理简历信息</el-menu-item> -->
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">学校概况</template>
        <el-menu-item index="profile">学校简介</el-menu-item>
      </el-submenu>
      <el-menu-item index="consult">留言咨询</el-menu-item>

      <el-menu-item index="register" class="right">注册</el-menu-item>
      <el-menu-item index="login" class="right">登录</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  data() {
    return {
      activeIndex: "home"
    };
  },
  methods: {}
};
</script>
<style lang="scss"  scoped>
.top-img {
  width: 550px;
}
.logo{
  color: rgb(126, 0, 67);
      // background-color: rgb(30, 100, 159);
  font-size: 54px;
  margin:10px 30px;
  span{
    font-size: 32px;
  }
}
.blank-box {
  height: 60px;
}
.el-menu.el-menu--horizontal {
  padding: 0 150px;
}

</style>