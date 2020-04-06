<template>
  <div class="container">
    <div class="page">
      <div class="header">
        <h3 class="title">企业信息</h3>
      </div>
      <div class="set-note">
        <ul>
          <h4>账户信息</h4>
          <hr >
          <li>
            <span>用户名：</span>
            <span>{{info.username}}</span>
          </li>

          <li>
            <span>密码：</span>
            <span>{{info.password}}</span>
          </li>
          <h4>联系人信息</h4>
          <hr/>

          <li>
            <span>联系人姓名：</span>
            <span>{{info.personal_username}}</span>
          </li>

          <li>
            <span>联系人电话：</span>
            <span>{{info.personal_tel}}</span>
          </li>
          <li>
            <span>联系人邮箱：</span>
            <span>{{info.personal_email}}</span>
          </li>
          <h4>企业信息</h4>
          <hr/>
          <li>
            <span>企业名称：</span>
            <span>{{info.rec_name}}</span>
          </li>
          <li>
            <span>企业性质：</span>
            <span>{{info.rec_kind}}</span>
          </li>
          <li>
            <span>企业所在行业：</span>
            <span>{{info.rec_class}}</span>
          </li>
          <li>
            <span>企业规模：</span>
            <span>{{info.rec_scale}}</span>
          </li>
          <li>
            <span>企业网站主页：</span>
            <a :href="info.rec_page">{{info.rec_page}}</a>
          </li>
          <li>
            <span>简历投递邮箱：</span>
            <span>{{info.rec_email}}</span>
          </li>
          <li>
            <span>企业联系电话：</span>
            <span>{{info.rec_tel}}</span>
          </li>
          <li>
            <span>企业地址：</span>
            <span>{{info.rec_address}}</span>
          </li>
          <li>
            <span>企业简介：</span>
            <div v-html="info.rec_intro"></div>
          </li>
          <li>
            <span>审核状态：</span>
            <el-radio-group v-model="info.status">
              <el-radio :label="0">待审核</el-radio>
              <el-radio :label="1">审核已通过</el-radio>
              <el-radio :label="2">审核未通过</el-radio>
            </el-radio-group>
          </li>
        </ul>
        <div class="btns">
          <el-button type="danger" @click="submit">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: [],
      id: "",
    };
  },
  methods: {
    getCompanyInfo() {
      this.$axios
        .post("/sysadmin/user/getCompanyInfo", { cid: this.id })
        .then(res => {
          this.info = res.data;
          
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    submit() {
      console.log(this.info)
       this.$axios
        .post("/sysadmin/user/modifyApprovalStatus", this.info )
        .then(res => {
          if(res.code==0){
            this.$message(res.msg)
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.id = this.$route.query.cid;
    this.getCompanyInfo();
  }
};
</script>
<style lang="scss" scoped>
ul,
ol,
li {
  list-style: none;
}
.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  .page {
    margin: 0 auto;
    padding: 10px 50px;
    // box-shadow: 2px 2px 5px 0 #666;
    .title {
      text-align: center;
    }
    .set-note {
      margin-top: 30px;
      ul {
        h4 {
          text-align: left;
        }
        li {
          display: flex;
          line-height: 40px;
          padding-left: 30px;
          span:first-child {
            // font-weight: bold;
          }
          span:last-child {
            color: #707070;
          }
          .el-radio-group {
            line-height: 50px;
          }
        }
        li:nth-last-child(2) {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          div {
            text-align: left;
            color: #707070;
            line-height: 35px;
          }
        }
      }
    }
  }
}
</style>