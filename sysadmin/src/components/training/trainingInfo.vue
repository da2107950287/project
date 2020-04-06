<template>
  <div>
    <div class="container">
        <div class="header">
        <h3 class="title">培训信息</h3>
      </div>
      <hr>
      <ul class="content">
        <li>
          <span>课程名：</span>
          <span>{{info.class_name}}</span>
        </li>
        <li>
          <span>培训讲师：</span>
          <span>{{info.class_teacher}}</span>
        </li>
        <li>
          <span>培训时间：</span>
          <span>{{info.class_time}}</span>
        </li>
        <li>
          <span>培训地点：</span>
          <span>{{info.class_place}}</span>
        </li>
        <li>
          <span>培训内容：</span>
          <div v-html="info.class_content"></div>
        </li>
        <li>
          <span>审核状态：</span>
          <el-radio-group v-model="info.status">
            <el-radio :label="0">未审核</el-radio>
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
</template>
<script>
export default {
  data() {
    return {
      info: [],
      tid:''
    };
  },
  methods: {
      getTrainingInfo() {
      this.$axios
        .post("/sysadmin/training/getTrainingInfo", {tid:this.tid})
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
        .post("/sysadmin/training/modifyApprovalStatus", this.info )
        .then(res => {
          console.log(res)
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
  this.tid=this.$route.query.tid;
  this.getTrainingInfo();
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
  ul.content {
    li {
      display: flex;
      line-height: 40px;

      span:first-child {
        font-weight: bold;
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
        line-height: 0;
      }
    }
  }
}
</style>