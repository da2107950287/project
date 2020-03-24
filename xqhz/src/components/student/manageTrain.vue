<template>
  <div class="resumelist">
    <div>
      <h3>培训报名记录</h3>
      <hr />
      <div class="container">
        <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
        >
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="class_name" label="课程名" align="center"></el-table-column>
          <el-table-column prop="class_teacher" label="讲师" align="center"></el-table-column>
          <el-table-column prop="class_time" label="培训时间" align="center"></el-table-column>
          <el-table-column prop="class_address" label="培训地址" align="center"></el-table-column>
          <el-table-column prop="apply_time" label="报名时间" align="center"></el-table-column>
          <!-- <el-table-column prop="class_introduce" label="课程介绍" align="center"></el-table-column> -->
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: {
        id: 0,
        class_name: "",
        class_teacher: "",
        class_time: "",
        class_address: "",
        class_introduce: "",
        apply_time: "",
        pageIndex: 1, //默认显示第一页
        pageSize: 10 //默认每页数据量
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0, //总条数
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      this.$axios
        .post("/xqhz/student/getTrainList", {
          pageIndex: this.query.pageIndex,
          pageSize: this.query.pageSize
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "pageIndex", val);
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
.resumelist {
  margin: 50px 150px;
  box-shadow: 2px 2px 5px 0 #666;
  > div {
    padding: 10px 50px;
  }
}
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.pagination {
  margin-top: 10px;
}
</style>