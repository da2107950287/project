<template>
  <div class="box">
    <el-container class="main">
      <el-header>Header</el-header>
      <el-container class="content">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>用户信息管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="go('/studentlist')">学生信息</el-menu-item>
                <el-menu-item index="1-2" @click="go('/companylist')">企业信息</el-menu-item>
                <el-menu-item index="1-3" @click="go('/adminlist')">管理员信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>招聘信息管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">招聘信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>培训信息管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">培训信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-menu"></i>简历信息管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">简历信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    go(url) {
      this.$router.replace(url).catch(err => {
        err;
      });
    }
  },
  created(){
      thisthis
  }
};
</script>
<style lang="scss" scoped>
.box {
  height: 100%;
  .main {
    height: 100%;
  }
}
.content {
  height: 100%;
  .el-aside {
    ul {
      height: 100%;
    }
  }
}
</style>
<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
