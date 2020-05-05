<template>
  <div class="recruitment-info">
    <div class="page">
      <h3 >招聘信息</h3>

      <ul class="container">
        <li>
          <div>职位名称：</div>
          <div>{{info.rec_position}}</div>
        </li>
        <li>
          <div>学历要求：</div>
          <div>{{info.rec_degree}}</div>
        </li>
        <li>
          <div>工作地点：</div>
          <div>{{info.rec_work_place}}</div>
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
            <div v-html="info.rec_content" class=""></div>
          </el-tab-pane>
          <!-- <el-tab-pane label="公司简介">
            <div v-html="info.rec_intro"></div>
          </el-tab-pane>-->
        </el-tabs>
         <li>
            <div>审核状态：</div>
            <el-radio-group v-model="info.status">
              <el-radio :label=0>待审核</el-radio>
              <el-radio :label=1>审核已通过</el-radio>
              <el-radio :label=2>审核未通过</el-radio>
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
      info: []
    };
  },
  methods: {
    getRecruitmentInfo(rid) {
      this.$axios
        .post("/sysadmin/recruitment/getRecruitmentInfo", { rid: rid })
        .then(res => {
          this.info = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
       submit() {
      console.log(this.info)
       this.$axios
        .post("/sysadmin/recruitment/modifyStatus", this.info )
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
  padding: 30px 50px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  .page {
    // margin: 0 auto;
    // padding: 30px;
    // box-shadow: 2px 2px 5px 0 #666;
    ul.container {
      text-align: left;
      li {
        display: flex;
        justify-content: flex-start;
        // padding: 10px 0;
        line-height: 50px;
        div:first-child {
          // font-weight: 600;
          color: #333;
        }
        div:last-child {
          margin-left: 3px;
          color: #333;
        }
      }
       .el-radio-group {
            line-height: 60px;
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
  
  }
}
.el-tabs--border-card > .el-tabs__content {
  color: #333;
}
</style>
