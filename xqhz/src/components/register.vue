<template>
  <div class="register">
    <div class="page">
      <div class="header">
        <h3 class="title">欢迎企业注册</h3>
      </div>
      <div class="set-note">
        <el-form :model="ruleForm"  ref="ruleForm"  :rules="loginFormRules" label-width="150px" class="demo-ruleForm">
          <!-- :rules="rules" -->
          <h4>账户信息</h4>
          <hr style="margin-bottom:25px" />
          <el-form-item label="用户名：" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="ruleForm.password" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="verify_password">
            <el-input v-model="verify_password" type="password" show-password></el-input>
          </el-form-item>
          <h4>联系人信息</h4>
          <hr style="margin-bottom:25px" />
          <el-form-item label="联系人姓名：" prop="personal_username">
            <el-input v-model="ruleForm.personal_username"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话：" prop="personal_tel">
            <el-input v-model="ruleForm.personal_tel"></el-input>
          </el-form-item>
          <el-form-item label="联系人邮箱：" prop="personal_email">
            <el-input v-model="ruleForm.personal_email"></el-input>
          </el-form-item>
          <h4>企业信息</h4>
          <hr style="margin-bottom:25px" />
          <el-form-item label="企业名称：" prop="rec_name">
            <el-input v-model="ruleForm.rec_name"></el-input>
          </el-form-item>
          <el-form-item label="企业性质：" prop="rec_kind">
            <el-select v-model="ruleForm.rec_kind" placeholder="请选择">
              <el-option
                v-for="item in arr1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="企业规模：" prop="rec_scale">
            <el-select v-model="ruleForm.rec_scale" placeholder="请选择">
              <el-option
                v-for="item in arr2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业所在行业：" prop="rec_class">
            <el-select v-model="ruleForm.rec_class" placeholder="请选择">
              <el-option
                v-for="item in arr3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业网站主页：" prop="rec_page">
            <el-input v-model="ruleForm.rec_page"></el-input>
          </el-form-item>

          <el-form-item label="简历投递邮箱：" prop="rec_email">
            <el-input v-model="ruleForm.rec_email"></el-input>
          </el-form-item>
          <el-form-item label="企业联系电话：" prop="rec_tel">
            <el-input v-model="ruleForm.rec_tel"></el-input>
          </el-form-item>

          <el-form-item label="企业地址：" prop="rec_address">
            <el-input v-model="ruleForm.rec_address"></el-input>
          </el-form-item>
          <el-form-item label="企业简介：" prop="rec_intro">
            <editor-bar v-model="ruleForm.rec_intro" :isClear="isClear" @change="change"></editor-bar>
          </el-form-item>

          <el-form-item class="btns">
            <el-button type="primary" @click="register">注册</el-button>
            <!-- <el-button type="info" @click="resetLoginForm">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import EditorBar from '../components/wangEditor/wangEditor'
export default {
  data() {
    return {
      isClear:false,
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
      arr2: [
        { value: "10人以下", label: "10人以下" },
        { value: "10人-50人", label: "10人-50人" },
        { value: "50人-100人", label: "50人-100人" },
        { value: "100人-200人", label: "100人-200人" },
        { value: "200人-500人", label: "200人-500人" },
        { value: "500人以上", label: "500人以上" }
      ],
      arr3: [
        { value: "农、林、牧、渔业 ", label: "农、林、牧、渔业 " },
        { value: "采矿业", label: "采矿业" },
        { value: "制造业", label: "制造业" },
        {
          value: "电力、热力、燃气及水的生产和供应业",
          label: "电力、热力、燃气及水的生产和供应业"
        },
        { value: "建筑业", label: "建筑业" },
        { value: "批发和零售业", label: "批发和零售业" },
        { value: "交通运输、仓储和邮政业", label: "交通运输、仓储和邮政业" },
        { value: "住宿和餐饮业", label: "住宿和餐饮业" },
        {
          value: "信息传输、软件和信息技术服务业",
          label: "信息传输、软件和信息技术服务业"
        },
        { value: "金融业", label: "金融业" },
        { value: "房地产业", label: "房地产业" },
        { value: "租赁和商务服务业", label: "租赁和商务服务业" },
        { value: "科学研究和技术服务业", label: "科学研究和技术服务业" },
        {
          value: "水利、环境和公共设施管理业",
          label: "水利、环境和公共设施管理业"
        },
        {
          value: "居民服务、修理和其他服务业",
          label: "居民服务、修理和其他服务业"
        },
        { value: "教育", label: "教育" },
        { value: "卫生和社会工作", label: "卫生和社会工作" },
        { value: "文化、体育和娱乐业", label: "文化、体育和娱乐业" },
        {
          value: "公共管理、社会保障和社会组织",
          label: "公共管理、社会保障和社会组织"
        },
        { value: "国际组织", label: "国际组织" },
        { value: "军队", label: "军队" }
      ],
      fileList: [],
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          // { min: 6, max: 12, message: "长度在 6到 12个字符", trigger: "blur" }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        verify_password:[
          { required: true, message: "请输入密码", trigger: "blur" },
          
        ]
        
      },
    };
  },
  methods: {
    register() {
      if (this.ruleForm.password !== this.verify_password) {
        this.$message("密码不一致");
      } else {
        this.$axios
          .post("/xqhz/user/register", this.ruleForm)
          .then(res => {
            if(res.code==0){
              this.$message.success(res.msg)
            }else{
              this.$message.error(res.msg)
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      console.log(this.ruleForm);
    },
    change(val){
      this.rec_intro=val
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  components:{
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
    padding: 10px 20px;
    // box-shadow: 2px 2px 5px 0 #666;
    .set-note {
      margin-top: 30px;
      padding: 0 20px;
    }
  }
}
</style>
<style lang="scss" scoped>
// ul,
// ol,
// li {
//   list-style-type: none;
// }
// ul {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   li {
//     height: 40px;
//     line-height: 40px;
//     display: flex;
//     width: 520px;
//     > span {
//       display: inline-block;
//       width: 120px;
//       font-weight: bold;
//       color: #34495e;
//     }
//     > input {
//       width: 400px;
//       height: 30px;
//     }
//   }
// }
.el-input {
  width: 400px;
}
.el-form-item__label {
  text-align: left;
}
</style>