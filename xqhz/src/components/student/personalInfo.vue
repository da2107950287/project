<template>
  <div class="register">
    <div class="page">
      <div class="header">
        <h3 class="title">个人信息</h3>
      </div>
      <hr />
      <div class="set-note">
        <el-form :model="ruleForm" ref="ruleForm" label-width="60px" class="demo-ruleForm">
          <!-- :rules="rules" -->
          <el-form-item label="学号：" prop="sno">
            <el-input clearable v-model="ruleForm.sno"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="username">
            <el-input clearable v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input clearable v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="学院：" prop="academy">
            <el-input clearable v-model="ruleForm.academy"></el-input>
          </el-form-item>
          <el-form-item label="专业：" prop="major">
            <el-input clearable v-model="ruleForm.major"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="edit">编辑</el-button>
            <el-button type="info" @click="submit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import EditorBar from "../wangEditor/wangEditor";
export default {
  data() {
    return {
      ruleForm: {
        sno: "", //职位
        username: "", //学历要求
        password: "", //招聘时间
        academy: "", //工作地点
        major: "", //招聘地点
        
      },
      test: "",
      isClear: false,
      detail: ""
    };
  },
  methods: {
    change(val) {
      console.log(val);
    },
    edit() {
      this.disabled = false;
    },
    submit() {
      this.$axios
        .post("/xqhz/student/getStudentInfo", this.ruleForm)
        .then(res => {
          this.$message(res.msg);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.$axios.post("/xqhz/student/getStudentInfo").then(res => {
      this.ruleForm = res.data;
      console.log(res.data);
    });
  },
  components: {
    EditorBar
  }
};
</script>
<style lang='scss' scoped>
.register {
  margin: 50px 150px;
  
  background-color: #fff;
  .page {
    margin: 0 auto;
    padding: 10px 50px;
    box-shadow: 2px 2px 5px 0 #666;
    .set-note {
      margin-top: 30px;
    }
  }
}
</style>
<style lang="scss">
.el-input {
  width: 400px;
}
.el-form-item__label {
  text-align: left;
}
</style>