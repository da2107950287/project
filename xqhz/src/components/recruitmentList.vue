<template>
  <div class="home">
    <h3>招聘信息</h3>
    <div class="handle-box">
      <el-input
        v-model="keywords"
        placeholder="请输入职位名称或企业名称"
        class="handle-input mr10"
        @keyup.enter.native="handleSearch"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table
      :data="trainingList"
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      :show-header="false"
    >
      <el-table-column label="职位名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span
            class="active"
            @click="getRecruitmentInfo(scope.row.rid)"
          >{{ scope.row.rec_position }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rec_name" label="企业名称"></el-table-column>
      <el-table-column prop="rec_time" label="招聘时间" show-overflow-tooltip></el-table-column>
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
      keywords: ""
    };
  },
  watch: {
    keywords() {
      if (this.keywords === "") {
        this.handleSearch();
      }
    }
  },
  methods: {
    getTrainingList() {
      this.$axios
        .post("/xqhz/company/getAllRecruitmentList", {})
        .then(res => {
          this.data = res.data;
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRecruitmentInfo(rid) {
      this.$router.push({
        path: "/recruitmentInfo",
        query: { rid: rid }
      });
    },
    // 处理数据
    getList() {
      let list1 = this.data.filter((item, index) =>
        item.rec_position.includes(this.keywords)
      );
      let list2 = this.data.filter((item, index) =>
        item.rec_name.includes(this.keywords)
      );
      let list = Array.from(new Set(list1.concat(list2)));

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
  //  box-shadow: 2px 2px 5px 0 #666;
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
  .table {
    .active {
      color: #4a90e6;
      cursor: default;
    }
    .active:hover {
      color: #ff4f00;
    }
  }
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>