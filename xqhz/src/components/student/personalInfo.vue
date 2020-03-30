<template>
  <div class="register">
    <div class="page">
      <div class="header">
        <h3 class="title">个人信息</h3>
      </div>
      <hr />
      <div class="set-note">
        <el-form ref="ruleForm" label-width="60px" class="demo-ruleForm">
          <el-form-item label="学号：" prop="sno">
            <div class="content">{{ruleForm.sno}}</div>
          </el-form-item>
          <el-form-item label="姓名：" prop="username">
            <div class="content">{{ruleForm.username}}</div>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <div class="content">{{ruleForm.password}}</div>
          </el-form-item>
          <el-form-item label="学院：" prop="academy">
            <div class="content">{{ruleForm.academy}}</div>
          </el-form-item>
          <el-form-item label="专业：" prop="major">
            <div class="content">{{ruleForm.major}}</div>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="edit">编辑</el-button>
            <el-button type="info" @click="saveEdit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-dialog title="基本信息" :visible.sync="editVisible" width="40%" class="base-informaion">
        <el-form :model="ruleForm" ref="ruleForm" label-width="60px" class="demo-ruleForm">
          <el-form-item label="学号：" prop="sno">
            <el-input clearable v-model="ruleForm.sno"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="username">
            <el-input clearable v-model="ruleForm.username"></el-input>
            <div></div>
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
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        sno: "", //学号
        username: "", //用户名
        password: "", //密码
        academy: "", //学院
        major: "" //专业
      },
      editVisible: false
    };
  },
  methods: {
    change(val) {
      console.log(val);
    },
    edit() {
      this.editVisible = true;
    },
    saveEdit() {
      
        this.$axios
          .post("/xqhz/student/editStudentInfo", this.ruleForm)
          .then(res => {
           
            this.$message(res.msg);
          })
          .catch(err => {
            console.log(err);
          });
      
    },
    confirm() {
      this.editVisible = false;
    },
    getStudentInfo() {
      this.$axios.post("/xqhz/student/getStudentInfo").then(res => {
        this.ruleForm = res.data;
      });
    }
  },
  created() {
    this.getStudentInfo();
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
      .content {
        color: #333;
      }
    }
  }
}
</style>
<style lang="scss">
.el-form-item__label {
  text-align: left;
}
</style>