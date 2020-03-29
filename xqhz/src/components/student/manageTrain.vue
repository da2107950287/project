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
          <!-- <el-table-column prop="id" label="ID" align="center"></el-table-column> -->
          <!-- <el-table-column prop="class_name" label="课程名" align="center"></el-table-column> -->
          <el-table-column label="课程名" align="center">
            <template slot-scope="scope">
              <div @click="getTrainingInfo(scope.row)" class="active">{{scope.row.class_name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="class_teacher" label="讲师" align="center"></el-table-column>
          <el-table-column prop="class_time" label="培训时间" align="center"></el-table-column>
          <el-table-column prop="class_place" label="培训地址" align="center"></el-table-column>
          <el-table-column prop="apply_time" label="报名时间" align="center"></el-table-column>
          <!-- <el-table-column prop="class_introduce" label="课程介绍" align="center"></el-table-column> -->
          <!-- <el-table-column prop="status" label="状态" align="center"></el-table-column> -->
        </el-table>
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1, //默认显示第一页
      pageSize: 10, //默认每页数据量
      class_name: "",
      editVisible: false,
      pageTotal: null, //总条数
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .post("/xqhz/student/getEntryTrain", {})
        .then(res => {
          this.data = res.data;
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      let list = this.data.filter((item, index) =>
        item.class_name.includes(this.class_name)
      );

      this.tableData = list.filter(
        (item, index) =>
          index < this.pageIndex * this.pageSize &&
          index >= this.pageSize * (this.pageIndex - 1)
      );
      this.pageTotal = list.length;
    },
    getTrainingInfo(data) {
      console.log(9999);
      this.$router.push({
        path: "/trainingInfo",
        query: { data: JSON.stringify(data) }
      });
    },
    // 分页导航
    handlePageChange(val) {
      // this.$set(this.query, "pageIndex", val);
      // this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
.resumelist {
  margin: 50px 150px;
  box-shadow: 2px 2px 5px 0 #666;
  background-color: #fff;
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
.active{
  color:red;
  cursor: pointer;
}
</style>