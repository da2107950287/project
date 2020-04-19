<template>
  <div class="training-info">
    <div class="page">
      <div class="header">
        <h3 class="title">{{info.class_name}}</h3>
        <hr />
      </div>
      <ul class="container">
        <li>
          <div>培训时间：</div>
          <div>{{info.class_time}}</div>
        </li>
        <li>
          <div>培训地点：</div>
          <div>{{info.class_place}}</div>
        </li>
        <li>
          <div>培训讲师：</div>
          <div>{{info.class_teacher}}</div>
        </li>
        <!-- <li class="content">
          <div>讲师介绍</div>
          <div>北京交大才子，华为、爱立信等通信巨头研发总监，10余年物联网行业工作经验，对物联网、2/3/4G无线网络、NB-IOT技术、数据通信等方面见解独到，主导参与华为骨干路由器、即时通信、网数通产品等多个项目研发，其产品创新解决方案荣获多个华为新颖创新奖。曾负责项目：华为骨干网、智能农业系统。</div>
        </li>-->
        <li class="content">
          <div>课程简介</div>
          <div v-html="info.class_content"></div>
        </li>
      </ul>
      <div class="submit_btn">
        <el-button type="primary" @click="apply">立即报名</el-button>
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
    apply() {
      this.$axios
        .post("/xqhz/training/selectIsApply", { tid: this.info.tid })
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.$message(res.msg);
          } else {
            this.$axios
              .post("/xqhz/training/applyTraining", { tid: this.info.tid })
              .then(res => {
                if (res.code == 0) {
                  this.$message.success(res.msg);
                }
                console.log(res);
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
    getTrainingInfo(tid) {
      this.$axios
        .post("/xqhz/company/getTrainingInfo", { tid: tid })
        .then(res => {
          this.info = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getTrainingInfo(this.$route.query.tid);
  }
};
</script>
<style lang='scss' scoped>
ul,
ol,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.training-info {
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
        padding: 10px;
        div:first-child {
          font-weight: 600;
          color: #34495e;
        }
        div:last-child {
          margin-left: 3px;
          color: #34495e;
        }
      }
      li:last-child{
        display: flex;
        flex-direction: column;
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
</style>
