<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <!-- <el-input v-model="rec_name" placeholder="公司名称" class="handle-input mr10"></el-input> -->
        <el-input v-model="rec_position" placeholder="职位名称" class="handle-input mr10"></el-input>
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
        <el-table-column prop="status" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-view"
              @click="handleSee(scope.row.rid)"
            >查看</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
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

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form :model="form" label-width="70px">
        <el-form-item label="状态">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      rec_position: "",
      pageIndex: 1, //当前页码
      pageSize: 10, //每页的条数
      limitUpload: 1,
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: null,
      form: {},
      idx: -1,
      id: -1
    };
  },
  methods: {
    // 触发搜索按钮
    handleSearch() {
      this.pageIndex = 1;
      this.getList();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/sysadmin/recruitment/delRecruitment", { tid: row.tid })
            .then(res => {
              if(res.data.code==0){
                  this.tableData.splice(index, 1);
              this.$message.success(res.data.msg);
              }
              
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    //批量删除
    delAllSelection() {
      console.log(this.multipleSelection)
      
      const length = this.multipleSelection.length;
      let str = "";
      console.log(this.delList)
      this.delList = this.delList.concat(this.multipleSelection);
      console.log(this.delList)
      this.$axios.post('sysadmin/recruitment/delAllRecruitment',{data:this.delList}).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(error)
      })
      for (let i = 0; i < length; i++) {
        // this.tableData.splice(index, 1);
        str += this.multipleSelection[i].class_name + " ";
      }
      
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$axios
        .post("/sysadmin/recruitment/editRecruitment", this.form)
        .then(res => {
          if (res.data.code == 0) {
            this.$message(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查看个人信息详情
    handleSee(index, row) {
      console.log(row);
      this.$router.push({ path: "/recruitmentInfo", query: { row } });
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
      let list = this.data.filter((item, index) =>
        item.rec_position.includes(this.rec_position)
      );

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
</style>