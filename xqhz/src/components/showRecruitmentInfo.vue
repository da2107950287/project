<template>
  <div class="register">
    <div class="page">
      <div class="header">
        <h3 class="title">产品经理/运营经理/技术经理/开发工程师/运维工程师
</h3>
        <hr>
      </div>
    
        <ul class="cotainer">
          <li>
            <div>单位名称：</div>
            <div><a href="">联通智网科技有限公司</a></div>
          </li>
          <li>
            <div>单位性质：</div>
            <div>其他企业</div>
          </li>
          <li>
            <div>单位主页：</div>
            <div>http://baidu.com</div>
          </li>
          <li>
            <div>所在行业：</div>
            <div>信息传输、软件和信息技术服务业</div>
          </li>
          <li>
            <div>单位规模：</div>
            <div>500人</div>
          </li>

          <li>
            <div>工作地点：</div>
            <div>北京市</div>
          </li>
          <li>
            <div>学历要求：</div>
            <div>本科</div>
          </li>
          <li>
            <div>招聘时间：</div>
            <div>2019-12-19 19：00</div>
          </li>
          <li>
            <div>招聘地点：</div>
            <div>一教405</div>
          </li>

          <el-tabs type="border-card" class="content">
            <el-tab-pane label="培训信息"></el-tab-pane>
            <el-tab-pane label="招聘信息"></el-tab-pane>
          </el-tabs>
        </ul>
      </div>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      disabled: true
    };
  },
  methods: {
    edit() {
      this.disabled = false;
    },
    submit() {
      this.$axios
        .post("/xqhz/company/editCoInfo", this.ruleForm)
        .then(res => {
          this.$message(res.msg);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.$axios.post("/xqhz/company/getCoInfo").then(res => {
      this.ruleForm = res.data;
      console.log(res.data);
    });
  }
};
</script>
<style lang='scss' scoped>
.register {
  margin: 50px 150px;
  .page {
    margin: 0 auto;
    padding: 10px 50px;
    box-shadow: 2px 2px 5px 0 #666;
    ul.cotainer {
      li{
          display:flex;
          justify-content: flex-start;
          padding: 5px;
          div:first-child{
              font-weight: 600; 
              color:#34495e
          }
          div:last-child{
              margin-left: 3px;
            color:#34495e;
          }
      }
      li:first-child{
          div:last-child{
              a{
                  color:#16a085;
                  text-decoration: none;
              }
          }
      }
      .content{
          margin-top:10px;
      }
    }
  }
}
</style>
<style lang="scss">

</style>