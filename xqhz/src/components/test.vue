<template>
  <div id="div">
    <input type="file" name="file" @change="changeFile" />
    <br />
    <button @click="sendAjax">发送请求</button>
    <br />
    <p>已经上传{{rate}}%</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      file: {},
      rate: 0
    };
  },
  methods: {
    changeFile(e) {
      this.file = e.target.files[0];
    },

    sendAjax() {
      var fd = new FormData(); //创建form对象
      fd.append("file", this.file); //通过append向form对象添加数据
      this.$axios
        .post("/xqhz/student/test", fd)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
</style>
<style scoped>
.t {
  width: 100px;
}
</style>