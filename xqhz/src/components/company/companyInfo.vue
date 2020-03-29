<template>
  <div class="register">
    <div class="page">
      <div class="header">
        <h3 class="title">企业信息</h3>
      </div>
      <div class="set-note">
        <el-form :model="ruleForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
          <!-- :rules="rules" -->
          <h4>账户信息</h4>
          <hr style="margin-bottom:25px" />
          <el-form-item label="用户名：" prop="username">
            <el-input :disabled="disabled" clearable v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input :disabled="disabled" clearable v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <h4>联系人信息</h4>
          <hr style="margin-bottom:25px" />
          <el-form-item label="联系人姓名：" prop="personal_username">
            <el-input :disabled="disabled" clearable v-model="ruleForm.personal_username"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话：" prop="personal_tel">
            <el-input :disabled="disabled" clearable v-model="ruleForm.personal_tel"></el-input>
          </el-form-item>
          <el-form-item label="联系人邮箱：" prop="personal_email">
            <el-input :disabled="disabled" clearable v-model="ruleForm.personal_email"></el-input>
          </el-form-item>
          <h4>企业信息</h4>
          <hr style="margin-bottom:25px" />
          <el-form-item label="企业名称：" prop="rec_name">
            <el-input :disabled="disabled" clearable v-model="ruleForm.rec_name"></el-input>
          </el-form-item>
          <el-form-item label="企业性质：" prop="rec_kind">
            <el-select :disabled="disabled" v-model="ruleForm.rec_kind" placeholder="请选择">
              <el-option
                v-for="item in arr1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业所在行业：" prop="rec_class">
            <el-select :disabled="disabled" v-model="ruleForm.rec_class" placeholder="请选择">
              <el-option
                v-for="item in arr2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业规模：" prop="rec_scale">
            <el-select :disabled="disabled" v-model=" ruleForm.rec_scale" placeholder="请选择">
              <el-option
                v-for="item in arr3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业网站主页：" prop="rec_page">
            <el-input :disabled="disabled" clearable v-model="ruleForm.rec_page"></el-input>
          </el-form-item>
          <el-form-item label="企业简介：" prop="rec_intro">
            <el-input :disabled="disabled" clearable v-model="ruleForm.rec_intro"></el-input>
          </el-form-item>
          <el-form-item label="简历投递邮箱：" prop="rec_email">
            <el-input :disabled="disabled" clearable v-model="ruleForm.rec_email"></el-input>
          </el-form-item>
          <el-form-item label="企业联系电话：" prop="rec_tel">
            <el-input :disabled="disabled" clearable v-model="ruleForm.rec_tel"></el-input>
          </el-form-item>

          <el-form-item label="企业地址：" prop="rec_address">
            <el-input :disabled="disabled" clearable v-model="ruleForm.rec_address"></el-input>
          </el-form-item>
          <!-- <el-form-item label="企业地址：" prop="rec_address">
          <div contenteditable="true">这里可以编辑</div>
          </el-form-item>-->
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
    return {
      ruleForm: {
        username: "", //用户名
        password: "", //密码
        personal_username: "", //联系人姓名
        personal_tel: "", //联系人电话
        personal_email: "", //联系人邮箱
        rec_name: "", //企业名称
        rec_kind: "", //企业性质
        rec_class: "", //企业所在行业
        rec_scale: "", //企业规模
        rec_page: "", //企业网站首页
        rec_intro: "", //企业简介
        rec_tel: "", //企业联系电话
        rec_address: "", //企业地址
        rec_email: "" //简历投递邮箱
      },
      verify_password: "", //确认密码
      arr1: [
        { value: "机关单位", label: "机关单位" },
        { value: "科研设计单位", label: "科研设计单位" },
        { value: "高等教育单位", label: "高等教育单位" },
        { value: "中初教育单位", label: "中初教育单位" },
        { value: "医疗卫生单位", label: "医疗卫生单位" },
        { value: "其他事业单位", label: "其他事业单位" },
        { value: "国有企业", label: "国有企业" },
        { value: "三资企业", label: "三资企业" },
        { value: "其他企业", label: "其他企业" },
        { value: "部队", label: "部队" },
        { value: "农村建制村", label: "农村建制村" },
        { value: "城镇社区", label: "城镇社区" },
        { value: "其他", label: "其他" }
      ],
      arr3: [
        { value: "10人以下", label: "10人以下" },
        { value: "10人-50人", label: "10人-50人" },
        { value: "50人-100人", label: "50人-100人" },
        { value: "100人-200人", label: "100人-200人" },
        { value: "200人-500人", label: "200人-500人" },
        { value: "500人以上", label: "500人以上" }
      ],
      arr2: [
        { value: "机关单位", label: "机关单位" },
        { value: "科研设计单位", label: "科研设计单位" },
        { value: "高等教育单位", label: "高等教育单位" },
        { value: "中初教育单位", label: "中初教育单位" },
        { value: "医疗卫生单位", label: "医疗卫生单位" },
        { value: "其他事业单位", label: "其他事业单位" },
        { value: "国有企业", label: "国有企业" },
        { value: "三资企业", label: "三资企业" },
        { value: "其他企业", label: "其他企业" },
        { value: "部队", label: "部队" },
        { value: "农村建制村", label: "农村建制村" },
        { value: "城镇社区", label: "城镇社区" },
        { value: "其他", label: "其他" }
      ],
      fileList: [],
      disabled: true
    };
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
// .el-input__inner{
//     border:0;
//     outline:none;
// }
.el-form-item__label {
  text-align: left;
}
</style>