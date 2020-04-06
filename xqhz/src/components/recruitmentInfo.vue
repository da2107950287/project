<template>
  <div class="recruitment-info">
    <div class="page">
      <div class="header">
        <h3 class="title">{{info.rec_position}}</h3>
        <hr />
      </div>
      <ul class="container">
        <li>
          <div>单位名称：</div>
          <div>
            <a href>{{info.rec_name}}</a>
          </div>
        </li>
        <li>
          <div>单位性质：</div>
          <div>{{info.rec_kind}}</div>
        </li>
        <li>
          <div>单位主页：</div>
          <div>{{info.rec_page}}</div>
        </li>
        <li>
          <div>所在行业：</div>
          <div>{{info.rec_class}}</div>
        </li>
        <li>
          <div>单位规模：</div>
          <div>{{info.rec_scale}}</div>
        </li>

        <li>
          <div>工作地点：</div>
          <div>{{info.rec_work_place}}</div>
        </li>
        <li>
          <div>学历要求：</div>
          <div>{{info.rec_degree}}</div>
        </li>
        <li>
          <div>招聘时间：</div>
          <div>{{info.rec_time}}</div>
        </li>
        <li>
          <div>招聘地点：</div>
          <div>{{info.rec_place_name}}</div>
        </li>

        <el-tabs type="border-card" class="bottom-box">
          <el-tab-pane label="职位描述">
            <div v-html="info.rec_content"></div>
          </el-tab-pane>
          <el-tab-pane label="公司简介">
            <div v-html="info.rec_intro"></div>
          </el-tab-pane>
        </el-tabs>
      </ul>
      <div  class="submit_btn">
      <el-button type="primary" @click="delivery">立即投递</el-button>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: []
    };
  },
  methods: {
    delivery() {
      // selectIsdelivery
      this.$axios
        .post("/xqhz/recruitment/selectIsDelivery", { rid: this.info.rid })
        .then(res => {
          if (res.code == 0) {
            this.$message(res.msg)
          }else{
            this.$axios
              .post("/xqhz/recruitment/delivery", { rid: this.info.rid })
              .then(res => {
                this.$message(res.msg)
              })
              .catch(err => {
                console.log(err);
              });
          }
         
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRecruitmentInfo(rid){
      this.$axios.post('/xqhz/company/getRecruitmentInfo',{rid}).then(res=>{
        this.info=res.data
      }).catch(err=>{
        console.log(err)
      })
    },
      canActivate (transition) {
        console.log(transition,"======上一个页面的url信息=======");
        transition.next();
      }
  },
  route: {
  //  data() {
  //   this.$root.showLoading();
  //   return this.fetchCertificates().then((res) => {
  //    this.$root.dismissLoading();
  //    if (res.error) return this.$root.toastError(res.error);
  //    if(res.data.certificates.length >0){
  //     return res.data;
  //    }else{
  //     console.log(this.$route ,"----当前页面的url信息----");
  //    }
  //   });
  //  },
   canActivate (transition) {
    console.log(transition,"======上一个页面的url信息=======");
    transition.next();
   }
  },
    
  created() {
    this.getRecruitmentInfo(this.$route.query.rid);
   console.log(this.$route)
  
    
  }
};
</script>
<style lang='scss' scoped>
ul,ol,li{
  margin: 0;
  padding: 0;
}
.recruitment-info {
  margin: 50px 150px;
  background-color: #fff;
  min-width: 800px;
  .page {
    margin: 0 auto;
    padding: 10px 50px;
    box-shadow: 2px 2px 5px 0 #666;
    ul.container {
      li {
        display: flex;
        justify-content: flex-start;
        padding: 5px;
        div:first-child {
          font-weight: 600;
          color: #34495e;
        }
        div:last-child {
          margin-left: 3px;
          color: #34495e;
        }
      }
      li:first-child {
        div:last-child {
          a {
            color: #16a085;
            text-decoration: none;
          }
        }
      }
      .bottom-box {
        margin-top: 10px;
      }
    }
     .submit_btn {
    display: flex;
    justify-content: center;
    margin-top: 20px;
      }
  }
}
</style>
