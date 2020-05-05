<template>
  <div class="register">
<div class="aside">
     <div @click="show(1)" :class="[isShow==1?'selected':'']">查看个人信息</div>
      <div @click="show(2)" :class="[isShow==2?'selected':'']">修改密码</div>

   
    </div>
    <div class="page" v-if="isShow==1">
      <div class="header">
        <h3 class="title">个人信息</h3>
      </div>
      <hr />
      <div class="set-note">
        <el-form ref="ruleForm" label-width="60px" class="demo-ruleForm" size="mini">
          <el-form-item label="学号：" prop="sno">
            <div class="content">{{ruleForm.username}}</div>
<<<<<<< HEAD
          </el-form-item>
          <el-form-item label="姓名：" prop="username">
            <div class="content">{{ruleForm.name}}</div>
=======
>>>>>>> 3303b1b39b0ee612accc3990bdbc2299465234bc
          </el-form-item>
            <el-form-item label="密码：" prop="password">
            <div class="content">{{ruleForm.password}}</div>
          </el-form-item>
          <el-form-item label="姓名：" prop="username">
            <div class="content">{{ruleForm.name}}</div>
          </el-form-item>
        
          <el-form-item label="学院：" prop="academy">
            <div class="content">{{ruleForm.academy}}</div>
          </el-form-item>
          <el-form-item label="专业：" prop="major">
            <div class="content">{{ruleForm.major}}</div>
          </el-form-item>
          <!-- <el-form-item class="btns">
            <el-button type="primary" @click="edit">编辑</el-button>
          </el-form-item> -->
        </el-form>
      </div>
      <el-dialog title="修改个人信息" :visible.sync="editVisible" width="40%" class="base-informaion">
        <el-form :model="ruleForm" ref="ruleForm" label-width="60px" class="demo-ruleForm">
          <el-form-item label="学号：" prop="username">
            <el-input clearable v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input clearable v-model="ruleForm.name"></el-input>
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
    <div class="page" v-if="isShow==2">
      <div>
        <div class="header">
        <h3 class="title">修改密码</h3>
      </div>
      <hr />
         <el-form :model="ruleForm" ref="ruleForm" label-width="90px" class="demo-ruleForm">
          <el-form-item label="原始密码：" prop="oldPassword">
            <el-input clearable v-model="form.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="newPassword">
            <el-input clearable v-model="form.newPassword"></el-input>
            <div></div>
          </el-form-item>
          <el-form-item label="确认密码：" prop="verifyPassword">
            <el-input clearable v-model="form.verifyPassword"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="editPassword">修改密码</el-button>
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
        sno: "", //学号
        username: "", //用户名
        password: "", //密码
        academy: "", //学院
        major: "" //专业
      },
      form:{
        oldPassword:'',
        newPassword:'',
        verifyPassword:''
      },
      editVisible: false,
      isShow:1
    };
  },
  methods: {
        show(type) {
     
      if(type==1){
         this.getStudentInfo();
      }else{
        // this.getTrainScore()
      }
       this.isShow = type;
    },
    editPassword(){
      let _this=this;
      this.$axios.post("/xqhz/student/verifyPassword",{})
       .then(res => {
         if(res.data.password===this.form.oldPassword){
           console.log(this.form.newPassword)
 _this.$axios.post('/xqhz/student/editPassword',{password:_this.form.newPassword})
          .then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err)
          })
         }else{
           this.$message.warning('原始密码错误')
         }
          this.$message(res.msg);
          console.log(res)
         
        })
        .catch(err => {
          console.log(err);
        });
    },
    change(val) {
      console.log(val);
    },
    edit() {
      this.editVisible = true;
    },
    confirm() {
      this.editVisible = false;
<<<<<<< HEAD
      this.$axios
        .post("/xqhz/student/editStudentInfo", this.ruleForm)
        .then(res => {
          this.$message(res.msg);
        })
        .catch(err => {
          console.log(err);
        });
=======
        this.$axios
          .post("/xqhz/student/editStudentInfo", this.ruleForm)
          .then(res => {
            this.$message(res.msg);
          })
          .catch(err => {
            console.log(err);
          });
>>>>>>> 3303b1b39b0ee612accc3990bdbc2299465234bc
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
  margin: 50px 100px;
  display: flex;
  // width:100%;
  .aside {
    margin-right: 30px;
    div {
      padding: 5px;
      padding-left: 1rem;
      height: 30px;
      line-height: 30px;
      margin-top: 6px;
      background-color: #fff;
      min-width: 150px;
      cursor: pointer;
      color: #505459;
    }
    .selected {
      background-color: #ff6b45;
      color: #fff;
    }
  }
  .page {
   width: 100%;
    padding: 10px 50px;
    background-color: #fff;
    // box-shadow: 2px 2px 5px 0 #666;
    .set-note {
      margin-top: 30px;
      .content {
        color: #333;
      }
    }
  }
}
.el-input__inner,
.el-input {
  width: 300px;
}
</style>
<style lang="scss">
.el-form-item__label {
  text-align: left;
}
</style>