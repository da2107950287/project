<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>-->
        <!-- <el-input v-model="rec_name" placeholder="公司名称" class="handle-input mr10"></el-input> -->
        <el-select v-model="status" @change="handleSearch" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-model="keywords"
          placeholder="职位名称"
          class="handle-input mr10"
          @keyup.enter.native="handleSearch"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column prop="rid" label="ID" align="center"></el-table-column>
        <el-table-column prop="rec_position" label="职位名称" align="center"></el-table-column>
        <el-table-column prop="rec_name" label="企业名称" align="center"></el-table-column>
        <el-table-column prop="rec_time" label="招聘时间" align="center"></el-table-column>
        <el-table-column prop="rec_place_name" label="招聘地点" align="center"></el-table-column>
        <el-table-column prop="statusText" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-view" @click="handleSee(scope.row.rid)">审核</el-button>
            <!-- <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >审核</el-button>-->
            <!-- <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>-->
          </template>
        </el-table-column>
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
</template>

<script>
export default {
  data() {
    return {
      data: [],
      keywords: "",
      pageIndex: 1, //当前页码
      pageSize: 10, //每页的条数
      tableData: [],
      multipleSelection: [],
      delList: [],
      pageTotal: null,
      form: {},
      status:-1,
      options: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "待审核"
        },
        {
          value: 1,
          label: "审核已通过"
        },
        {
          value: 2,
          label: "审核未通过"
        }
      ]
    };
  },
  watch: {
    keywords() {
      if (rhis.keywords == "") {
        this.handleSearch();
      }
    }
  },
  methods: {
    // 触发搜索按钮
    handleSearch() {
      this.pageIndex = 1;
      this.getList();
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },

    // 编辑操作
    handleEdit(index, row) {
      this.form = row;
      this.editVisible = true;
    },
    // 查看个人信息详情
    handleSee(rid) {
      // console.log(row);
      this.$router.push({
        path: "/sysadminRecruitmentInfo",
        query: { rid: rid }
      });
    },
    // 分页导航
    handlePageChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    //获取数据
    getRecruitmentList() {
      this.$axios
        .post("/sysadmin/recruitment/getRecruitmentList", {})
        .then(res => {
          this.data = res.data;
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      let list = this.data.filter((item, index) =>{
        if (this.status === 0 || this.status === 1 || this.status === 2) {
          
          return this.status === item.status&&(item.rec_position.includes(this.keywords));
        } else {
          return true&&(item.rec_position.includes(this.keywords));
        }
        
      }
    
      
    
      );
      list.forEach((item, index) => {
        
        if (item.status == 0) {
          this.$set(item, "statusText", "待审核");
        } else if (item.status == 1) {
          this.$set(item, "statusText", "审核已通过");
        } else {
          this.$set(item, "statusText", "审核未通过");
        }
      });
      this.tableData = list.filter(
        (item, index) =>
          index < this.pageIndex * this.pageSize &&
          index >= this.pageSize * (this.pageIndex - 1)
      );
      this.pageTotal = list.length;
    }
  },
  created() {
    this.getRecruitmentList();
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.handle-box {
  margin-bottom: 20px;
  text-align: left;
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
  margin-top: 20px;
  text-align: center;
}
</style>