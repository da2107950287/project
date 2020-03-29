<template>
  <div>
    <div class="container">
      <ul class="content">
        <!-- <li>
          <div>学号:</div>
          <div>{{this.info.sno}}</div>
        </li>-->
        <li>
          <div>姓名:</div>
          <div>{{this.info.username}}</div>
        </li>
        <li>
          <div>密码:</div>
          <div>{{this.info.password}}</div>
        </li>
        <!-- <li>
          <div>学院:</div>
          <div>{{this.info.academy}}</div>
        </li>
        <li>
          <div>专业:</div>
          <div>{{this.info.major}}</div>
        </li>-->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: [],
      id: ""
    };
  },
  methods: {
    getCompanyInfo() {
      this.$axios
        .post("/sysadmin/user/getCompanyInfo", {cid: this.id})
        .then(res => {
          this.info = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.id = this.$route.query.cid;
    console.log(this.id)
    this.getCompanyInfo();
    console.log(888)
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  .content {
    li {
      list-style: none;
      display: flex;
      justify-content: flex-start;
      line-height: 30px;
      margin-bottom: 10px;
      div:first-child {
        font-weight: 600;
        color: #34495e;
      }
      div:last-child {
        margin-left: 10px;
        color: #34495e;
      }
    }
  }
}
</style>