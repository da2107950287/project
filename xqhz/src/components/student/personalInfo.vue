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
          <el-form-item label="学号：" prop="rec_time">
            <el-input clearable v-model="ruleForm.rec_time"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="rec_title">
            <el-input clearable v-model="ruleForm.rec_title"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="rec_degree">
            <el-input clearable v-model="ruleForm.rec_degree"></el-input>
          </el-form-item>
          <el-form-item label="学院：" prop="rec_place_name">
            <el-input clearable v-model="ruleForm.rec_place_name"></el-input>
          </el-form-item>
          <el-form-item label="专业：" prop="rec_place_name">
            <el-input clearable v-model="ruleForm.rec_place_name"></el-input>
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
        rec_title: "", //职位
        rec_degree: "", //学历要求
        rec_time: "", //招聘时间
        rec_work_place: "", //工作地点
        rec_place_name: "", //招聘地点
        rec_content: "" //职位描述
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
        .post("/xqhz/company/editCoInfo", this.ruleForm)
        .then(res => {
          this.$message(res.msg);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.$axios.post("/xqhz/company/getCoInfo").then(res => {
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
  padding: 50px 150px;
  // margin:0 auto;
  // border-radius: 1px solid #000;
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