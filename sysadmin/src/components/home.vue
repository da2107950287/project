<template>
  <div>
    <ul class="box">
      <li
        v-for="(item,index) in list"
        :key="index"
        :style="{backgroundColor:item.backgroundColor}"
      >{{item.title}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { title: "待审核公司", backgroundColor: "#32cc7f" },
        { title: "待审核招聘信息", backgroundColor: "#6c6fbf" },
        { title: "待审核培训信息", backgroundColor: "#ccc" },
        { title: "待回复留言咨询", backgroundColor: "#ccc" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
ul,
ol,
li {
  list-style: none;
}
.box {
  display: flex;
  width: 100%;
  li {
    text-align: center;
    height: 200px;
    width: 22%;
    margin-right: 3%;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
}
</style>