<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-upload
          class="upload-demo"
          action
          :on-change="handleChange"
          :on-remove="handleRemove"
          :limit="limitUpload"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">导入</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div> -->
        </el-upload>
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <el-input v-model="query.sno" placeholder="学号" class="handle-input mr10"></el-input>
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
        <el-table-column prop="id" label="ID"  align="center"></el-table-column>
        <el-table-column prop="sno" label="学号" align="center"></el-table-column>
        <el-table-column prop="password" label="密码" align="center"></el-table-column>
        <el-table-column prop="academy" label="学院" align="center"></el-table-column>
        <el-table-column prop="major" label="专业" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-view" @click="handleSee(scope.$index, scope.row)">查看</el-button>
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
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
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
      query: {
        sno: "",
        pageIndex: 1, //当前页码
        pageSize: 10, //每页的条数
        total:null, //总的条数
      },

      limitUpload: 1,
      tableData: [
        { id: 0, sno: 11, name: 11, password: 11, academy: 11, major: 11 },
        { id: 1, sno: 11, name: 11, password: 11, academy: 11, major: 11 },
        { id: 2, sno: 11, name: 11, password: 11, academy: 11, major: 11 },
        { id: 3, sno: 11, name: 11, password: 11, academy: 11, major: 11 },
        { id: 4, sno: 11, name: 11, password: 11, academy: 11, major: 11 },
        { id: 5, sno: 11, name: 11, password: 11, academy: 11, major: 11 },
        { id: 6, sno: 11, name: 11, password: 11, academy: 11, major: 11 },
        { id: 7, sno: 11, name: 11, password: 11, academy: 11, major: 11 },
        { id: 8, sno: 11, name: 11, password: 11, academy: 11, major: 11 },
        { id: 9, sno: 11, name: 11, password: 11, academy: 11, major: 11 },
        { id: 10, sno: 11, name: 11, password: 11, academy: 11, major: 11 },
        { id: 11, sno: 11, name: 11, password: 11, academy: 11, major: 11 },
        { id: 12, sno: 11, name: 11, password: 11, academy: 11, major: 11 }
      ],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {},
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

    handleRemove(file, fileList) {
      this.fileTemp = null;
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
            obj.id = v["id"];
            obj.sno = v["sno"];
            obj.name = v["name"];
            obj.password = v["password"];
            obj.academy = v["academy"];
            obj.major = v["major"];
            arr.push(obj);
          });
          console.log(arr);
          _this.tableData = arr;
          //   console.log(this.tableData)
          //   return arr;
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
        this.getData();
    
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功");
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    //批量删除
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      console.log(this.delList);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].sno + " ";
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 查看个人信息详情
    handlSee(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 分页导航
    handlePageChange(val) {
    
      //   this.$set(this.query, "pageIndex", val);
        this.getData();
    },
    //获取数据
    getData() {
      this.$axios
        .post("/sysadmin/user/getStudentList", {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
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