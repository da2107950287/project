<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-plus" @click="addAdmin(form)">添加管理员</el-button>

        <el-input v-model="username" placeholder="请输入用户名" class="handle-input mr10"></el-input>
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
        <!-- <el-table-column prop="aid" label="ID" align="center" sortable></el-table-column> -->
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop="password" label="密码" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              icon="el-icon-view"
              @click="handleSee(scope.$index, scope.row)"
            >查看</el-button>-->
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
    <el-dialog title="添加管理员" :visible.sync="addVisible" width="30%">
      <el-form :model="form" label-width="70px">
        <el-form-item label="账号">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" label-width="70px">
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="editVisible" width="30%">
      <el-form :model="form" label-width="70px">
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
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
      username: "",
      pageIndex: 1, //当前页码
      pageSize: 10, //每页的条数
      limitUpload: 1,
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      addVisible: false
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
      this.$confirm("确定要删除该条数据吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/sysadmin/user/delAdmin", { aid: row.aid })
            .then(res => {
              console.log(res);
              if (res.code == 0) {
                this.tableData.splice(index, 1);
                --this.pageTotal;
                this.$message.success(res.msg);
              } else {
                this.$message.error(res.msg);
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

    // 编辑操作
    handleEdit(index, row) {
      this.form = row;
      this.editVisible = true;
    },
    saveEdit() {
      this.editVisible = false;
      this.$axios
        .post("/sysadmin/user/editAdmin", this.form)
        .then(res => {
          if (res.code == 0) {
            this.$message.success(res.msg);
            this.getList();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存添加管理员信息
    saveAdd() {
      this.addVisible = false;
      this.$axios
        .post("/sysadmin/user/addAdmin", this.form)
        .then(res => {
          if (res.code == 0) {
            this.$message.success(res.msg);
            this.getList();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addAdmin() {
      this.addVisible = true;
    },
    // 查看个人信息详情
    handleSee(index, row) {
      console.log(row);
      this.$router.push({ path: "/sysadminStudentInfo", query: { row } });
    },
    // 分页导航
    handlePageChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    //获取管理员列表
    getAdminList() {
      this.$axios
        .post("/sysadmin/user/getAdminList", {})
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
        item.username.includes(this.username)
      );

      this.tableData = list.filter(
        (item, index) =>
          index < this.pageIndex * this.pageSize &&
          index >= this.pageSize * (this.pageIndex - 1)
      );
      console.log(this.tableData);
      this.pageTotal = list.length;
    }
  },
  created() {
    this.getAdminList();
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