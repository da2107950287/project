<template>
  <div>
    <div class="container">
      <ul class="content">
        <li>
          <div>课程名:</div>
          <div>{{this.info.class_name}}</div>
        </li>
        <li>
          <div>培训讲师:</div>
          <div>{{this.info.class_teacher}}</div>
        </li>
        <li>
          <div>培训时间:</div>
          <div>{{this.info.class_time}}</div>
        </li>
        <li>
          <div>培训地点:</div>
          <div>{{this.info.class_place}}</div>
        </li>
        <li>
          <div>培训内容:</div>
          <div v-html="this.info.class_content"></div>
        </li>
      </ul>
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
  created() {
    this.info = this.$route.query.row;
    console.log(this.info);
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