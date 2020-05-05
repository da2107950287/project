<template>
  <div>
    <div class="container">
      <div class="handle-box">
      <div style="display:flex">
        <div class="mr10">
            <el-button type="danger" @click="getExcel(tableData)">导出学生列表</el-button>
           <el-button type="primary" icon="el-icon-plus"  @click="addStudent(form)">添加学生</el-button>
          
        
         </div>
          <el-upload
          class="upload-demo"
          action
          :on-change="handleChange"
          :limit="limitUpload"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          :auto-upload="false"
          :show-file-list="false"
        >
<<<<<<< HEAD
          <el-button type="primary">批量导入学生</el-button>
=======
          <el-button type="primary">批量添加学生</el-button>
>>>>>>> 3303b1b39b0ee612accc3990bdbc2299465234bc
        </el-upload>
         
      </div>
        <el-button
          type="danger"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <el-input
          v-model="val"
          placeholder="学号或姓名"
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
        <el-table-column prop="sid" label="ID" align="center"></el-table-column>
        <el-table-column prop="username" label="学号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="academy" label="学院" align="center"></el-table-column>
        <el-table-column prop="major" label="专业" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
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
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="pageIndex"
          :page-size="pageSize"
          :total="pageTotal"
          :page-sizes="[10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="30%">
      <el-form :model="form" label-width="70px">
        <el-form-item label="学号">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="form.academy"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form.major"></el-input>
        </el-form-item>
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
      val: "",
      pageIndex: 1, //当前页码
      pageSize: 10, //每页的条数
      pageTotal: null,
      limitUpload: 1,
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      form: {},
      title:""
    };
  },
  methods: {
    //导入列表
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.importXLSX(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！"
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！"
        });
      }
    },
    //导入excel
    importXLSX(obj) {
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj;
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          this.da = [...outdata];
          let arr = [];
          this.da.map(v => {
            let obj = {};
            obj.username = v["账号"];
            obj.name = v["姓名"];
            obj.password = v["密码"];
            obj.academy = v["学院"];
            obj.major = v["专业"];
            arr.push(obj);
          });
          _this.$axios
            .post("/sysadmin/user/addStudentList", { data: arr })
            .then(res => {
              _this.$message.success(res.data.msg);
              if (res.data.code === 0) {
<<<<<<< HEAD
                _this.$alert("学生信息导入成功")
=======
>>>>>>> 3303b1b39b0ee612accc3990bdbc2299465234bc
                _this.getStudentList();
              }
            })
            .catch(err => {
              console.log(err);
            });
        };
        
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    //导出excel
    getExcel(res) {
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../../assets/js/Excel/Export2Excel");
        const tHeader = ["ID", "学号", "姓名","密码", "学院", "专业"];
        const filterVal = [
          "sid",
          "username",
          "name",
          "password",
          "academy",
          "major"
        ];
        const list = res;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "学生列表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    addStudent(){
      this.form={}
      this.editVisible = true;
      this.title="添加学生";
      
    },
    // 触发搜索按钮
    handleSearch() {
      this.pageIndex = 1;
      this.getList();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除该数据吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/sysadmin/user/delStudent", { sid: row.sid })
            .then(res => {
              this.tableData.splice(index, 1);
<<<<<<< HEAD
               this.$alert(res.data.msg);
=======
               this.$message.success(res.data.msg);
>>>>>>> 3303b1b39b0ee612accc3990bdbc2299465234bc
              if (res.data.code == 0) {
                this.getStudentList();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    //多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量删除
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      console.log(this.delList)
      // for (let i = 0; i < length; i++) {
      //   str += this.multipleSelection[i].username + " ";
      // }
      this.$axios
        .post("/sysadmin/user/delMultStudent", { data: this.delList })
        .then(res => {
          if (res.data.code === 0) {
          this.$message.success(res.data.msg);
            this.getStudentList();
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      this.form = row;
      this.editVisible = true;
      this.title="修改学生信息"
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$axios
        .post("/sysadmin/user/editStudent", this.form)
        .then(res => {
          console.log(this.form)
<<<<<<< HEAD
               this.$alert(res.data.msg);
          if (res.code === 0) {
            this.$alert(res.msg);
=======
          if (res.code === 0) {
            this.$message.success(res.msg);
>>>>>>> 3303b1b39b0ee612accc3990bdbc2299465234bc
            this.getStudentList()
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查看个人信息详情
    handleSee(index, row) {
      this.form = row;
      this.seeVisible = true;
    },
    //currentPage 改变时会触发
    handlePageChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    //pageSize 改变时会触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    //获取学生列表
    getStudentList() {
      this.$axios
        .post("/sysadmin/user/getStudentList", {})
        .then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data;
            this.getList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      let list1 = this.data.filter((item, index) =>
        item.name.includes(this.val)
      );
      let list2 = this.data.filter((item, index) =>
        item.username.includes(this.val)
      );
           let list=Array.from(new Set(list1.concat(list2)));

      this.tableData = list.filter(
        (item, index) =>
          index < this.pageIndex * this.pageSize &&
          index >= this.pageSize * (this.pageIndex - 1)
      );
      this.pageTotal = list.length;
    }
  },
  created() {
    this.getStudentList();
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
.upload-demo {
  margin-bottom: 10px;
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
  margin-top: 10px;
}
</style>