<template>
  <div class="box">
    <el-container class="main">
      <el-header>
        <div class="header">
          <div class="logo">校企合作信息后台管理系统</div>
          <div class="header-right">
            <div class="header-user-con">
              <!-- 用户头像 -->
              <div class="user-avator">
                <img src="../assets/img/avtor.jpg" />
              </div>
              <!-- 用户名下拉菜单 -->
              <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  {{username}}
                  <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>
      <el-container class="content">
        <el-aside width="200px">
          <el-menu :default-active="this.$route.name" router>
            <el-menu-item index="sysadminhome">
              <template>
              首 页
              </template>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <!-- <i class="el-icon-message"></i> -->
                用户信息管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="studentList">学生信息</el-menu-item>
                <el-menu-item index="companyList">企业信息</el-menu-item>
                <el-menu-item index="adminList">管理员信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                招聘信息管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="recruitmentList">招聘信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                培训信息管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="trainingList">培训信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <!-- <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-menu"></i>简历信息管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">简历信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
            <el-submenu index="6">
              <template slot="title">
                <!-- <i class="el-icon-message"></i> -->
                咨询信息管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="consultList">咨询信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container class="el-main">
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Vheader from "./header";
export default {
  data() {
    return {
      collapse: false,
      fullscreen: false,
      name: "管理员",
    };
  },
  
  computed: {
    username() {
      let username = localStorage.getItem("username");
      return username ? username : this.name;
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("token");
        this.$router.push("/");
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
    }
  },
  components: {
    Vheader
  }
};
</script>
<style lang="scss" scoped>
.box {
  height: 100%;
  .main {
    height: 100%;
    .content {
      .el-aside {
        ul {
          height: 100%;
          
        }
      }
    
    }
  }
}

</style>
<style lang="scss" scoped>
.el-header {
  background-color: #242f42;
  color: #fff;
  text-align: center;
  line-height: 70px;
  height: 70px;
  .header {
    .logo {
      float: left;
      width: 250px;
      line-height: 70px;
    }
    .header-right {
      float: right;
      padding-right: 50px;
      .header-user-con {
        display: flex;
        height: 70px;
        align-items: center;
        .user-avator {
          margin-left: 20px;
          img {
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .user-name {
          margin-left: 10px;
          .el-dropdown-link {
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.el-aside {
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  // overflow: scroll;
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
