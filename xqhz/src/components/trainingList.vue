<template>
  <div class="home">
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="panel-title">培训信息</div>
        <el-input v-model="class_name" placeholder="课程名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <div class="panel-body">
        <table class="table">
          <thead>
            <tr>
              <th>课程名</th>
              <th>培训讲师</th>
              <th>培训时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in trainingList" :key="index">
              <td class="post-sort" @click="getTrainingInfo(item)">{{item.class_name}}</td>
              <td class="post-intro">{{item.class_teacher}}</td>
              <td class="post-time">{{item.class_time}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
  name: "App",
  data() {
    return {
      trainingList: [],
      data: [],
      pageIndex: 1, //当前页码
      pageSize: 10, //每页的条数
      pageTotal: null,
      class_name:''
    };
  },
  methods: {
    getTrainingList() {
      this.$axios
        .post("/xqhz/company/getTrainingList", {})
        .then(res => {
          console.log(res);
          this.data = res.data;
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTrainingInfo(data) {
      console.log(data);
      this.$router.push({
        path: "/trainingInfo",
        query: { data: JSON.stringify(data) }
      });
    },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
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

<style lang="scss">
ul,
ol,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.home {
  margin: 0 150px;
  background-color: #ffffff;
  .panel {
    margin-top: 20px;

    border: 1px solid #efefef;
    border-radius: 4px;
    .panel-heading {
      color: #333333;
      background-color: #ccc;
      border-color: #dddddd;
      padding-left: 20px;
      height: 50px;
      line-height: 50px;
      display: flex;
      .handle-input {
        width: 300px;
        display: inline-block;
      }
      .mr10 {
        margin-right: 10px;
      }
    }
    .panel-body {
      padding: 0 20px;
      .table {
        width: 100%;
        max-width: 100%;
        color: #333333;
        background-color: transparent;
        table-layout: fixed;
        border-collapse: collapse;
        th {
          text-align: left;
          border-bottom: 2px solid #f6f6f6;
        }
        th,
        td {
          padding: 8px;
          overflow: hidden;
          padding-right: 10px !important;
          padding-left: 10px !important;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
        }
        tr {
          td {
            line-height: 1.42857143;
            vertical-align: top;
            border-bottom: 2px dotted #f6f6f6;
          }
          .post-sort {
            color: #4a90e6;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>