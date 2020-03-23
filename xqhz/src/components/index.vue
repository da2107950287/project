<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="home">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">学生</template>
        <el-menu-item index="personalInfo">个人信息</el-menu-item>
        <el-menu-item index="resume">个人简历</el-menu-item>
        <el-menu-item index="2-3">招聘投递管理</el-menu-item>
        <el-menu-item index="2-3">培训报名管理</el-menu-item>

      </el-submenu>
      <el-submenu index="3">
        <template slot="title">企业</template>
        <el-menu-item index="m">管理企业信息</el-menu-item>
        <el-menu-item index="recruitment">管理招聘信息</el-menu-item>
        <el-menu-item index="training">管理培训信息</el-menu-item>
         <el-menu-item index="resumelist">管理简历信息</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">学校</template>
        <el-menu-item index="profile">学校简介</el-menu-item>
        <el-menu-item index="4-2">选项2</el-menu-item>
        <el-menu-item index="4-3">选项3</el-menu-item>
      </el-submenu>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "/home",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      console.log(typeof keyPath)
     this.$router.push({name:key});
    }
  }
};
</script>
<style scoped>
.el-menu.el-menu--horizontal{
  padding-left:100px;
}
</style>