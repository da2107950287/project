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
            <a :href="info.rec_page">{{info.rec_name}}</a>
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

        <el-tabs type="card" class="bottom-box">
          <el-tab-pane label="职位描述">
            <div v-html="info.rec_content"></div>
          </el-tab-pane>
          <el-tab-pane label="公司简介">
            <div v-html="info.rec_intro"></div>
          </el-tab-pane>
        </el-tabs>
      </ul>
      <div class="submit_btn">
        <el-button type="primary" @click="delivery">投递简历</el-button>
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
      this.$axios
        .post("/xqhz/recruitment/selectResume", { rid: this.info.rid })
        .then(res => {
          if (res.code == 1) {
           this.$alert('请上传简历后，再投递简历！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          this.$router.push({ path: "/manageResume" });
          }
        });
            
          } else {
            this.$axios
              .post("/xqhz/recruitment/selectIsDelivery", {
                rid: this.info.rid
              })
              .then(res => {
                if (res.code == 0) {
                   this.$alert(res.msg,'提示');
                } else {
                  this.$axios
                    .post("/xqhz/recruitment/delivery", { rid: this.info.rid })
                    .then(res => {
                      this.$alert(res.msg,'提示');
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
    },
    getRecruitmentInfo(rid) {
      this.$axios
        .post("/xqhz/company/getRecruitmentInfo", { rid })
        .then(res => {
          this.info = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  created() {
    this.getRecruitmentInfo(this.$route.query.rid);
  }
};
</script>
<style lang='scss' scoped>
ul,
ol,
li {
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
    // box-shadow: 2px 2px 5px 0 #666;
    ul.container {
      li {
        display: flex;
        justify-content: flex-start;
        padding: 10px;
        div:first-child {
          // font-weight: 600;
          color: #333;
        }
        div:last-child {
          margin-left: 3px;
          color: #333;
        }
      }
      li:first-child {
        div:last-child {
          a {
            color: #1e649f;
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
      margin-bottom: 20px;
    }
  }
}
.el-tabs--border-card > .el-tabs__content {
  color: #333;
}
</style>
