<template>
  <div class="home">
    <h3>培训信息</h3>
    <div class="handle-box">
      <el-input v-model="class_name" placeholder="请输入课程名" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table
      :data="trainingList"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
   
    >
       <!-- @selection-change="handleSelectionChange" -->
      <el-table-column label="课程名" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="active" @click="getTrainingInfo(scope.row.tid)">{{ scope.row.class_name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="class_teacher" label="培训讲师" align="center"></el-table-column>
      <el-table-column prop="class_time" label="培训时间" align="center" show-overflow-tooltip></el-table-column>
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
</template>

<script>
export default {
  data() {
    return {
      trainingList: [],
      data: [],
      pageIndex: 1, //当前页码
      pageSize: 10, //每页的条数
      pageTotal: null,
      class_name: ""
    };
  },
  methods: {
    getTrainingList() {
      this.$axios
        .post("/xqhz/company/getAllTrainingList", {})
        .then(res => {
          this.data = res.data;
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTrainingInfo(tid) {
      this.$router.push({
        path: "/trainingInfo",
        query: { tid: tid }
      });
    },
    // 处理数据
    getList() {
      let list = this.data.filter((item, index) =>
        item.class_name.includes(this.class_name)
      );
      this.trainingList = list.filter(
        (item, index) =>
          index < this.pageIndex * this.pageSize &&
          index >= this.pageSize * (this.pageIndex - 1)
      );
      this.pageTotal = list.length;
    },
    // 触发搜索按钮
    handleSearch() {
      this.pageIndex = 1;
      this.getList();
    },
    // 分页导航
    handlePageChange(val) {
      this.pageIndex = val;
      this.getList();
    }
  },
  created() {
    this.getTrainingList();
  }
};
</script>

<style lang="scss" scoped>
ul,
ol,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.home {
  margin: 50px 150px;
  background-color: #ffffff;
   box-shadow: 2px 2px 5px 0 #666;
   padding: 20px 50px 50px;
 
  .handle-box {
    height: 35px;
    margin-bottom: 20px;
    .el-input__inner,
    .el-input {
      width: 300px;
      height: 35px;
      display: inline-block;
    }
    .el-button {
      padding: 11px;
    }
  }
  .pagination{
    margin-top: 20px;
    text-align: center;
  }
  .table{
    .active{
      color:#4a90e6;
      cursor: default;
    }
    .active:hover{
      color:#FF4F00
    }
  }
}
</style>