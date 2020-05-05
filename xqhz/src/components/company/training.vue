<template>
  <div class="continer">
    <div class="aside">
      <div @click="show(1)" :class="[isShow==1?'selected':'']">培训信息列表</div>
      <div @click="show(3)" :class="[isShow==3?'selected':'']">培训报名列表</div>

      <div @click="show(2)" :class="[isShow==2?'selected':'']">发布培训信息</div>
      <!-- <div @click="show(4)" :class="[isShow==4?'selected':'']">成绩列表</div> -->
    </div>
    <div class="page" v-if="isShow==1">
      <h3>培训信息列表</h3>
      <div class="handle-box">
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
          placeholder="请输入课程名"
          class="handle-input mr10"
          @keyup.enter.native="handleSearch"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <!-- <hr /> -->
           <div style="margin-top:10px">

        <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
        >
          <el-table-column label="课程名" align="center">
            <template slot-scope="scope">
              <div @click="getTrainingInfo(scope.row.tid)" class="active">{{scope.row.class_name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="class_teacher" label="讲师" align="center"></el-table-column>
          <el-table-column prop="class_time" label="培训时间" align="center"></el-table-column>
          <el-table-column prop="class_place" label="培训地址" align="center"></el-table-column>
          <el-table-column prop="statusText" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <!-- <el-button type="text" icon="el-icon-view" @click="handleSeeInfo(scope.row)">查看</el-button> -->
              <el-button type="text" icon="el-icon-view" @click="handleEdit(scope.row)">查看</el-button>
              <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button> -->
              <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.$index,scope.row)"
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
    </div>
    <div class="page" v-if="isShow==2">
      <div class="header">
        <h3 class="title">发布培训信息</h3>
      </div>
      <!-- <hr /> -->
      <div style="margin-top:10px">
        <el-form :model="ruleForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
          <el-form-item label="课程名：" prop="class_name">
            <el-input clearable v-model="ruleForm.class_name"></el-input>
          </el-form-item>
          <el-form-item label="培训讲师：" prop="class_teacher">
            <el-input clearable v-model="ruleForm.class_teacher"></el-input>
          </el-form-item>
          <el-form-item label="培训时间：" prop="class_time">
            <el-date-picker
              v-model="ruleForm.class_time"
              type="datetimerange"
              range-separator="至"
              value-format="yyyy-MM-dd 00:00:00"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="培训地点：" prop="class_place">
            <el-input clearable v-model="ruleForm.class_place"></el-input>
          </el-form-item>
          <el-form-item label="培训内容：" prop="class_content">
            <editor-bar v-model="ruleForm.class_content" :isClear="isClear" @change="change"></editor-bar>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="danger" @click="postTraining">发布</el-button>
            <!-- <el-button v-else type="danger">修改</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="page" v-if="isShow==3">
      <h3>培训报名列表</h3>
      <div class="handle-box">
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="handleSearch"
          ></el-option>
        </el-select>
        <el-input
          v-model="keywords"
          placeholder="请输入课程名"
          class="handle-input mr10"
          @keyup.enter.native="handleSearch"
        ></el-input>

        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
           <div style="margin-top:10px">

    
        <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
        >
          <el-table-column label="课程名" align="center">
            <template slot-scope="scope">
              <div @click="getTrainingInfo(scope.row.tid)" class="active">{{scope.row.class_name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="class_teacher" label="讲师" align="center"></el-table-column>
          <el-table-column prop="class_time" label="培训时间" align="center"></el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="handleSee(scope.row)">查看</el-button>
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
    <el-dialog title="培训信息" :visible.sync="editVisible" width="70%">
      <el-form label-width="100px">
        <el-form-item label="课程名">
          <el-input v-model="form.class_name" type="input"></el-input>
          <!-- <div>{{form.class_name}}</div> -->
        </el-form-item>
        <el-form-item label="讲师">
          <el-input v-model="form.class_teacher" type="input"></el-input>
          <!-- <div>{{form.class_teacher}}</div> -->
        </el-form-item>
        <el-form-item label="培训时间">
          <!-- <el-input v-model="form.class_time" type="input"></el-input> -->
          <el-date-picker
            v-model="form.class_time"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd 00:00:00"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <!-- <div>{{form.class_time}}</div> -->
        <el-form-item label="培训地址">
          <!-- <div></div> -->
          <el-input v-model="form.class_place" type="input"></el-input>
        </el-form-item>
        <el-form-item label="培训内容">
          <!-- <div>{form.class_content}}</div> -->
          <editor-bar v-model="form.class_content" :isClear="isClear" @change="change"></editor-bar>
          <!-- <el-input v-model="form.class_content" type="textarea" show-word-limit maxlength="100"></el-input> -->
        </el-form-item>
        <!-- <el-form-item label="状态">
          <div>{{form.status}}</div>
          <el-input v-model="form.status" type="input"></el-input>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="培训报名列表" :visible.sync="listVisible" width="60%">
      <el-table :data="dialogTable" border style="width: 100%">
        <el-table-column prop="username" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="entry_time" label="报名时间"></el-table-column>
        <el-table-column prop="score" label="成绩">
          <template slot-scope="scope">
            <!-- <div v-if="scope.row.score">{{scope.row.score}}</div> -->
            <el-input size="small" v-model="scope.row.score" style="width:200px"></el-input>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="dialogPageIndex"
          :page-size="dialogPageSize"
          :total="dialogPageTotal"
          @current-change="handleDialogPageChange"
        ></el-pagination>
           <el-button type="danger" @click="saveScore" style="margin-top:10px">保存</el-button>
      </div>
   
    </el-dialog>
  </div>
</template>
<script>
import EditorBar from "../wangEditor/wangEditor";
export default {
  data() {
    return {
      editVisible: false,
      listVisible: false,
      isShow: 1,
      form: {},
      ruleForm: {
        class_name: "", //课程名
        class_teacher: "", //培训讲师
        class_time: "", //培训时间
        class_place: "", //培训地点
        class_content: "" //课程介绍
      },
      tableData: [],
      dialogTable: [],
      pageIndex: 1, //默认显示第一页
      pageSize: 10, //默认每页数据量
      pageTotal: 0,
      dialogPageIndex: 1,
      dialogPageSize: 10,
      dialogPageTotal: 0,
      isClear: false,
      keywords: "",
      isPost: true,
      status: -1,
      options: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "未审核"
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
      if (this.keywords === "") {
        this.handleSearch();
      }
    }
  },
  methods: {
    show(type) {
      if (type == 1) {
        this.getSelfTrainingList();
      } else if (type == 2) {
        this.ruleForm = {};
        // class_name: "", //课程名
        //   class_teacher: "", //培训讲师
        //   class_time: "", //培训时间
        //   class_place: "", //培训地点
        //   class_content: "" //课程介绍
      } else if (type == 3) {
        this.getSelfTrainingList();
      }
      this.isShow = type;
    },
    change(val) {
      this.class_content = val;
      console.log(val);
    },
    saveScore() {
      console.log(this.dialogTable);
      let _this = this;
      let data = this.dialogTable.map((item, index) => {
        console.log(_this.dialogTable);
        let data = {};
        data.eid = item.eid;
        data.sid = item.sid;
        data.score = parseInt(item.score)
        return data;
      });
      this.$axios.post("/xqhz/company/saveScore", { data: data }).then(res => {
        this.data = res.data;
        this.getDialogList();
      });
    },
    edit() {
      this.disabled = false;
    },
    saveEdit() {},
    // handleEdit(data) {
    //   console.log(data);
    //   this.ruleForm = data;
    //   this.isShow = 1;
    //   this.isPost = false;
    // },
    handleEdit(data) {
      this.editVisible = true;

      var arr = data.class_time.split("至");
      data.class_time = arr;
      this.form = data;
    },
    // handleSeeInfo(data){
    //   this.editVisible=true;
    //   this.form=data;
    // },
    handleDelete(index,data) {
  
      this.$confirm("确定要删除该条数据吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/xqhz/company/delTraining", { tid: data.tid })
            .then(res => {
            if(res.code==0){
               this.tableData.splice(index, 1);
                --this.pageTotal;
              this.$message.success(res.msg)
            }else{
              this.$message.error(res.msg)
            }
            });
        })
        .catch(() => {});
    },
    handleSeeList() {
      console.log(888);
      this.$axios.post("/xqhz/company/getSelfTrainingList", {}).then(res => {
        console;
        this.data = res.data;
        this.getList();
        this.listVisible = true;
      });
    },
    handleSee(data) {
      console.log(data);

      this.$axios
        .post("/xqhz/company/getApplyRecordList", { tid: data.tid })
        .then(res => {
          this.data = res.data;
          this.getDialogList();
          this.listVisible = true;
        });
    },
    getDialogList() {
      this.data.forEach((item, index) => {
        if (item.entry_time) {
          item.entry_time = item.entry_time
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
        }
      });
      this.dialogTable = this.data.filter(
        (item, index) =>
          index < this.dialogPageIndex * this.dialogPageSize &&
          index >= this.dialogPageSize * (this.dialogPageIndex - 1)
      );
      this.dialogPageTotal = this.data.length;
    },
    postTraining() {
      console.log(this.ruleForm.class_time);
      this.ruleForm.class_time = this.ruleForm.class_time.join("至");
      this.$axios
        .post("/xqhz/company/postTraining", this.ruleForm)
        .then(res => {
          console.log(res);
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
    // 分页导航
    handlePageChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    handleDialogPageChange(val) {
      this.dialogPageIndex = val;
      this.getDialogList();
    },
    //获取数据
    getSelfTrainingList() {
      this.$axios
        .post("/xqhz/company/getSelfTrainingList", {})
        .then(res => {
          this.data = res.data;
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // getApplyRecordList() {
    //   this.$axios
    //     .post("/xqhz/company/getApplyRecordList", {})
    //     .then(res => {
    //       this.data = res.data;
    //       this.getList();
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // 处理数据
    getList() {
      // console.log(888);
      // es6过滤得到满足搜索条件的展示数据list
      this.tableData = [];
      let list = this.data.filter((item, index) => {
        if (this.status === 0 || this.status === 1 || this.status === 2) {
          return (
            this.status === item.status &&
            item.class_name.includes(this.keywords)
          );
        } else {
          return true && item.class_name.includes(this.keywords);
        }
      });
      list.forEach(item => {
        if (item.entry_time) {
          item.entry_time = item.entry_time
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
        }
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
      console.log(this.tableData);
    },
    handleSearch() {
      console.log(88);
      this.pageIndex = 1;
      this.getList();
    }
  },
  created() {
    this.getSelfTrainingList();
  },
  components: {
    EditorBar
  }
};
</script>
<style lang='scss' scoped>
.continer {
  margin: 50px 100px;
  display: flex;
  // width: 100%;
  .aside {
    margin-right: 30px;

    div {
      padding: 5px;
      padding-left: 1rem;
      height: 30px;
      line-height: 30px;
      margin-top: 4px;
      background-color: #fff;
      min-width: 150px;
      cursor: pointer;
      color: #505459;
    }
    .selected {
      background-color: #ff6b45;
      color: #fff;
    }
  }
  .page {
    margin: 0 auto;
    padding: 10px 50px;
    // box-shadow: 2px 2px 5px 0 #666;
    background-color: #fff;
    width: 100%;
    .header {
      display: flex;
      align-items: center;
      .handle-box {
        text-align: left;
      }
    }
    .set-note {
      margin-top: 30px;
    }
  }
  .resume-list {
    margin: 0 auto;
    padding: 10px 50px;
    width: 100%;
    border: 1px solid #ccc;
    background-color: #fff;
  }
}
.active {
  color: #4a90e6;
  cursor: default;
}
.active:hover {
  color: #ff4f00;
}
.el-input__inner,
.el-input {
  width: 300px;
}
.pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
