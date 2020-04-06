<template>
  <div>
    <img src="../assets/img/top.png" class="top-img">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#1e649f"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <el-menu-item index="home">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">学生</template>
        <el-menu-item index="personalInfo">个人信息</el-menu-item>
        <el-menu-item index="manageResume">简历管理</el-menu-item>
        <el-menu-item index="manageTrain">培训管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">企业</template>
        <el-menu-item index="companyInfo">管理企业信息</el-menu-item>
        <el-menu-item index="recruitment">管理招聘信息</el-menu-item>
        <el-menu-item index="training">管理培训信息</el-menu-item>
        <el-menu-item index="resumelist">管理简历信息</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">学校概况</template>
        <el-menu-item index="profile">学校简介</el-menu-item>
      </el-submenu>
      <el-menu-item index="consult">留言咨询</el-menu-item>
      
      <el-menu-item index="register" class="right">注册</el-menu-item>
      <el-menu-item index="login" class="right">登录</el-menu-item>
    </el-menu>
    <!-- <div class="blank-box"></div> -->
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
  methods: {
    
  }
};
</script>
<style scoped>

.top-img{
  width: 550px;
}

.blank-box{
  height:60px;
}
.el-menu.el-menu--horizontal {
  padding:0 150px;
}
.right{
  
}
</style>