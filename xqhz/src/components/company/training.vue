<template>
  <div class="register">
    <div class="page">
      <div class="header">
        <h3 class="title">培训信息</h3>
      </div>
      <hr />
      <div class="set-note">
        <el-form :model="ruleForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
          <!-- :rules="rules" -->
          <el-form-item label="课程名：" prop="class_title">
            <el-input clearable v-model="ruleForm.class_title"></el-input>
          </el-form-item>
          <el-form-item label="培训讲师：" prop="class_teacher">
            <el-input clearable v-model="ruleForm.class_teacher"></el-input>
          </el-form-item>
          <el-form-item label="培训时间：" prop="class_time">
            <el-input clearable v-model="ruleForm.class_time"></el-input>
          </el-form-item>
          <el-form-item label="培训地点：" prop="class_place_name">
            <el-input clearable v-model="ruleForm.class_place_name"></el-input>
          </el-form-item>
          <el-form-item label="培训内容：" prop="class_content">
            <!-- <el-input  clearable v-model="ruleForm.class_content"></el-input> -->
            <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
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
        class_title: "", //课程名
        class_teacher: "", //培训讲师
        class_time: "", //培训时间
        class_work_place: "", //培训地点
        class_content: "" //课程建设
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
  margin: 50px 150px;
  // margin:0 auto;
  // border-radius: 1px solid #000;
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