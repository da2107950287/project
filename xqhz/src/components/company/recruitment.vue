<template>
  <div class="register">
    <div class="page">
      <div class="header">
        <h3 class="title">企业信息</h3>
      </div>
      <div class="set-note">
        <el-form :model="ruleForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
          <!-- :rules="rules" -->
          
         
          <el-form-item label="工作地点" prop="rec_work_place">
            <el-input :disabled="disabled" clearable v-model="ruleForm.rec_work_place"></el-input>
          </el-form-item>
          <el-form-item label="招聘时间：" prop="rec_time">
            <el-input :disabled="disabled" clearable v-model="ruleForm.rec_time"></el-input>
          </el-form-item>
          <el-form-item label="招聘地点：" prop="rec_kind">
            <el-select :disabled="disabled" v-model="ruleForm.rec_place_name" placeholder="请选择">
              <el-option
                v-for="item in arr1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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
export default {
  data() {
    return{

    }
  },
  methods: {
    edit() {
      this.disabled = false;
    },
    submit() {
      this.$axios
        .post("/xqhz/company/editCoInfo", this.ruleForm)
        .then(res => {
          this.$message(res.msg)
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
  }
};
</script>
<style lang='scss' scoped>
.register {
  padding: 50px 100px;
  // margin:0 auto;
  // border-radius: 1px solid #000;
  .page {
    margin: 0 auto;
    padding: 10px 20px;
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