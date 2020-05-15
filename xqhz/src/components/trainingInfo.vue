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
        
           <el-tabs type="card" class="bottom-box">
          <el-tab-pane label="课程介绍">
            <div v-html="info.class_content"></div>
          </el-tab-pane>
          <!-- <el-tab-pane label="讲师介绍">
            <div v-html="info.class_content"></div>
          </el-tab-pane> -->
        </el-tabs>
     
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
             this.$alert(res.msg,'提示');
          } else {
            this.$axios
              .post("/xqhz/training/applyTraining", { tid: this.info.tid })
              .then(res => {
                if (res.code == 0) {
                   this.$alert(res.msg,'提示');
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
      console.log(tid);

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
    console.log(this.$route.query.tid);
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
          // color: #333;
        }
      }
      li:last-child {
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
