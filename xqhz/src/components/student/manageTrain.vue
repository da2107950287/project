<template>
  <div class="container">
    <div class="aside">
      <div @click="show(1)" :class="[isShow==1?'active':'']">培训报名记录</div>
      <div @click="show(2)" :class="[isShow==2?'active':'']">培训成绩列表</div>
    </div>
    <div class="training-entry-list" v-if="isShow==1">
      <h3>培训报名记录</h3>
      <hr />
      <div>
        <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
        >
          <el-table-column label="课程名" align="center">
            <template slot-scope="scope">
              <div @click="getTrainingInfo(scope.row)" class="active">{{scope.row.class_name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="class_teacher" label="讲师" align="center"></el-table-column>
          <el-table-column prop="class_time" label="培训时间" align="center"></el-table-column>
          <el-table-column prop="class_place" label="培训地址" align="center"></el-table-column>
          <el-table-column prop="entry_time" label="报名时间" align="center"></el-table-column>
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
    <div class="training-entry-list" v-if="isShow==2">
      <h3>培训成绩列表</h3>
      <hr />
      <!-- <div>
        <el-table
          :data="tableData1"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
        >
          <!-- <el-table-column prop="id" label="ID" align="center"></el-table-column> -->
          <!-- <el-table-column prop="class_name" label="课程名" align="center"></el-table-column> -->
          <!-- <el-table-column label="课程名" align="center">
            <template slot-scope="scope">
              <div @click="getTrainingInfo(scope.row)" class="active">{{scope.row.class_name}}</div>
            </template>
          </el-table-column> -->
          <!-- <!-- <el-table-column prop="class_teacher" label="讲师" align="center"></el-table-column> -->
          <el-table-column prop="score" label="培训时间" align="center"></el-table-column>
          <!-- <el-table-column prop="class_place" label="培训地址" align="center"></el-table-column>
          <el-table-column prop="entry_time" label="报名时间" align="center"></el-table-column> --> -->
          <!-- <el-table-column prop="class_introduce" label="课程介绍" align="center"></el-table-column> -->
          <!-- <el-table-column prop="status" label="状态" align="center"></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="pageIndex1"
            :page-size="pageSize1"
            :total="pageTotal1"
            @current-change="handlePageChange1"
          ></el-pagination>
        </div>

      </div> -->
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
      pageTotal: null, //总条数
      tableData1: [],
      pageIndex1: 1, //默认显示第一页
      pageSize1: 10, //默认每页数据量
      pageTotal1: null, //总条数
      class_name: "",
      editVisible: false,
      data:[],
      data1:[],
      form: {},
      idx: -1,
      id: -1,
      isShow: 1
    };
  },
  
  methods: {
    show(type) {
      this.isShow = type;
    },
    getData() {
      this.$axios
        .post("/xqhz/student/getEntryTrainList", {})
        .then(res => {
          this.data = res.data;
         
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // getTrainScore
      getData1() {
      this.$axios
        .post("/xqhz/student/getTrainScore", {})
        .then(res => {
          this.data1 = res.data;
         
          this.getList1();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      let list = this.data.forEach((item, index) =>
        item.entry_time.replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
        
      );console.log( "2020-03-30T15:10:11.000Z".replace(/T/g,' ').replace(/\.[\d]{3}Z/,''))
      this.tableData = list.filter(
        (item, index) =>
          index < this.pageIndex * this.pageSize &&
          index >= this.pageSize * (this.pageIndex - 1)
      );
      this.pageTotal = list.length;
    },
    // getList1() {
    //   // es6过滤得到满足搜索条件的展示数据list
    //   let list1 = this.data1.filter((item, index) =>
    //   item.class_name.includes(this.class_name)
    //     // item.entry_time.replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
    //   );
    //   this.tableData1 = list1.filter(
    //     (item, index) =>
    //       index < this.pageIndex1 * this.pageSize1 &&
    //       index >= this.pageSize1 * (this.pageIndex1 - 1)
    //   );
    //   this.pageTotal1 = list1.length;
    // },
    getTrainingInfo(data) {
      this.$router.push({
        path: "/trainingInfo",
        query: { data: JSON.stringify(data) }
      });
    },
    // 分页导航
    handlePageChange(val) {
     this.pageIndex=val;
      this.getList();
    },
    // handlePageChange1(val) {
    //  this.pageIndex1=val;
    //   this.getList1();
    // }
  },
  created() {
    this.getData();
    // this.getData1()
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 50px 150px;
  display: flex;
  // width:100%;
  .aside {
    margin-right: 30px;
    div {
      padding: 5px;
      padding-left: 1rem;
      height: 30px;
      line-height: 30px;
      margin-top: 6px;
      background-color: #fff;
      min-width: 150px;
      cursor: pointer;
      color: #505459;
    }
    .active {
      background-color: #FF6B45;
      color:#fff;
    }
  }
  .training-entry-list {
    margin: 0 10px;
    width: 100%;
    border: 1px solid #ccc;
    background-color: #fff;
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
// .active {
//   color: red;
//   cursor: pointer;
// }
</style>