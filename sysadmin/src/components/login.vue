<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/img/avator.jpg" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入账号"
            @keyup.enter="login"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            @keyup.enter="login"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item prop="verifycode">
          <div class="identifybox">
            <el-input
              placeholder="请输入验证码"
              style="width:50%;margin-right:20px"
              v-model="loginForm.verifycode"
              @keyup.enter="login"
            ></el-input>
            <div @click="refreshCode">
              <s-identify :identifyCode="identifyCode"></s-identify>
            </div>
          </div>
        </el-form-item>
        <div class="btns">
          <div>
            <el-button type="primary" @click="login" style="width:360px">登录</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import SIdentify from "./identify";
export default {
  data() {
    const validateVerifycode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
        callback(new Error("验证码不正确!"));
      } else {
        callback();
      }
    };
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: ""
      },
      identifyCodes: "ABCDEFGHIJKLIMNOPQRSTUVWSYZ1234567890",
      identifyCode: "",
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        //验证验证码
        verifycode: [
          { required: true, trigger: "blur", validator: validateVerifycode }
        ]
      }
    };
  },
  methods: {
    //登录
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          this.$axios
            .post("/sysadmin/user/login", this.loginForm)
            .then(res => {
              if (res.data.code == 0) {
<<<<<<< HEAD
                
                this.$alert(res.data.msg);
                alert(999999)
=======
                this.$alert(res.data.msg);
>>>>>>> 3303b1b39b0ee612accc3990bdbc2299465234bc
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", res.data.username);
                this.$router.push({ path: "/home" });
              } else {
<<<<<<< HEAD
                this.$message.error(res.data.msg);
=======
                this.$alert(res.data.msg);
>>>>>>> 3303b1b39b0ee612accc3990bdbc2299465234bc
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    // 切换验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    }
  },
  mounted() {
    this.refreshCode();
  },
  components: {
    SIdentify
  }
};
</script>

<style lang="scss" scoped>
.login_container {
  background-color: #ccc;
  height: 100%;
}
.login_box {
  width: 400px;
  height: 340px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  .el-input {
    .el-input__prefix {
      font-size: 30px;
      color: #000;
    }
  }
}
.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 40px;
  margin-bottom: 20px;
  .forget-password {
    font-size: 14px;
    color: #9098a4;
    transition: all 0.2s;
  }
  .forget-password:hover {
    color: #3388ff;
  }
}
.identifybox {
  display: flex;
}
</style>
