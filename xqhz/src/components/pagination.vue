<template>
  <div class="pagination">
    <el-pagination
      background
      layout="total, prev, pager, next"
      :current-page="pageIndex"
      :page-size="pageSize"
      :total="pageTotal"
      @current-change="handlePageChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      pageTotal: null
    };
  },
  methods: {
    handlePageChange(val) {
      this.pageIndex = val;
      this.getList();
    //   this.$emit('getList');
    },
     getList() {
      // es6过滤得到满足搜索条件的展示数据list
      let list = this.data.filter((item, index) =>
        item.entry_time.replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
      );
      this.tableData = list.filter(
        (item, index) =>
          index < this.pageIndex * this.pageSize &&
          index >= this.pageSize * (this.pageIndex - 1)
      );
      this.pageTotal = list.length;
    },
  }
};
</script>
<style scoped>
</style>