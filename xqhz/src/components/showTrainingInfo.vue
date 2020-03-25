<template>
  <div class="register">
    <div class="page">
      <div class="header">
        <h1 class="title">数据结构</h1>
        <hr />
      </div>
      <ul class="cotainer">
        <li>
          <div>培训时间：</div>
          <div>2020-10-19 20:00</div>
        </li>
        <li>
          <div>培训地点：</div>
          <div>一教405</div>
        </li>

        <li class="content">
          <div>讲师介绍</div>
          <div>北京交大才子，华为、爱立信等通信巨头研发总监，10余年物联网行业工作经验，对物联网、2/3/4G无线网络、NB-IOT技术、数据通信等方面见解独到，主导参与华为骨干路由器、即时通信、网数通产品等多个项目研发，其产品创新解决方案荣获多个华为新颖创新奖。曾负责项目：华为骨干网、智能农业系统。</div>
        </li>
        <li class="content">
          <div>课程简介</div>
          <div>ID放假回家后进行检查不能自拔纯牛奶不能自拔不能比年初</div>
        </li>

        <el-button type="primary" @click="apply" class="submit_btn">立即报名</el-button>
     
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    apply() {
      this.$axios
        .post("/xqhz/training/apply")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {}
};
</script>
<style lang='scss' scoped>
ul,
ol,
li {
  margin: 0;
  padding: 0;
}
.register {
  margin: 50px 150px;
  background-color: #fff;

  .page {
    margin: 0 auto;
    padding: 10px 50px;
    box-shadow: 2px 2px 5px 0 #666;
    ul.cotainer {
      li {
        display: flex;

        align-items: center;
        padding: 5px 10px;

        div:first-child {
          font-weight: bold;
      
          color: #333;
          white-space: nowrap;
          font-size: 18px;
        }
        div:last-child {
          margin-left: 3px;
          color: #666;
          font: size 16px;
          line-height: 18px;
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
      .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        div:last-child {
          line-height: 30px;
          border: 1px solid #000;
          margin-top: 10px;
          padding: 5px 10px;
        }
      }
      .submit_btn{
        margin: 0 auto;
        
      }
    }
  }
}
</style>
