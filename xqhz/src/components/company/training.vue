<template>
  <div class="continer">
    <div class="aside">
      <div @click="show(1)" :class="[isShow==1?'selected':'']">发布培训信息</div>
      <div @click="show(2)" :class="[isShow==2?'selected':'']">培训信息列表</div>
      <div @click="show(3)" :class="[isShow==3?'selected':'']">培训报名列表</div>
    </div>
    <div class="page" v-if="isShow==1">
      <div class="header">
        <h3 class="title">培训信息</h3>
      </div>
      <hr />
      <div class="set-note">
        <el-form :model="ruleForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
          <!-- :rules="rules" -->
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
              range-separator="-"
              value-format="yyyy-MM-dd 00:00:00"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="培训地点：" prop="class_place">
            <el-input clearable v-model="ruleForm.class_place"></el-input>
          </el-form-item>
          <el-form-item label="培训内容：" prop="class_content">
            <!-- <el-input  clearable v-model="ruleForm.class_content"></el-input> -->
            <editor-bar v-model="ruleForm.class_content" :isClear="isClear" @change="change"></editor-bar>
          </el-form-item>
          <el-form-item class="btns">
            <el-button v-if="isPost==true" type="danger" @click="postTraining">发布</el-button>
            <el-button v-else type="danger">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page" v-if="isShow==2">
      <h3>培训信息列表</h3>
      <div class="handle-box">
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input v-model="class_name" placeholder="请输入职位名称" class="handle-input mr10"></el-input>

        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
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
              <div @click="getTrainingInfo(scope.row.tid)" class="active">{{scope.row.class_name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="class_teacher" label="讲师" align="center"></el-table-column>
          <el-table-column prop="class_time" label="培训时间" align="center"></el-table-column>
          <el-table-column prop="class_place" label="培训地址" align="center"></el-table-column>
          <el-table-column prop="statusText" label="状态" align="center"></el-table-column>

          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit( scope.row)">编辑</el-button>
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
          ></el-option>
        </el-select>
        <el-input v-model="class_name" placeholder="请输入职位名称" class="handle-input mr10"></el-input>

        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
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
              <div @click="getTrainingInfo(scope.row.tid)" class="active">{{scope.row.class_name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="class_teacher" label="讲师" align="center"></el-table-column>
          <el-table-column prop="class_time" label="培训时间" align="center"></el-table-column>
          <!-- <el-table-column prop="class_place" label="培训地址" align="center"></el-table-column> -->
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
  </div>
</template>
<script>
import EditorBar from "../wangEditor/wangEditor";
export default {
  data() {
    return {
      isShow: 1,
      ruleForm: {
        class_name: "", //课程名
        class_teacher: "", //培训讲师
        class_time: "", //培训时间
        class_place: "", //培训地点
        class_content: "" //课程介绍
      },
      tableData: [],
      pageIndex: 1, //默认显示第一页
      pageSize: 10, //默认每页数据量
      pageTotal: 0,
      isClear: false,
      class_name: "",
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
  methods: {
    show(index) {
      this.isShow = index;
      if (index == 1) {
        this.ruleForm =  {
        class_name: "", //课程名
        class_teacher: "", //培训讲师
        class_time: "", //培训时间
        class_place: "", //培训地点
        class_content: "" //课程介绍
        }
      } else if (index == 2) {
        this.getSelfTrainingList();
      } else if (index == 3) {
        this.getApplyRecordList();
      }
    },
    change(val) {
      this.class_content = val;
      console.log(val);
    },
    edit() {
      this.disabled = false;
    },
    handleEdit(data) {
      console.log(data);
      this.ruleForm = data;
      this.isShow = 1;
      this.isPost = false;
    },
    postTraining() {
      console.log(this.ruleForm);
      this.ruleForm.class_time = this.ruleForm.class_time.join("-");
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
    getApplyRecordList() {
      this.$axios
        .post("/xqhz/company/getApplyRecordList", {})
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
      this.tableData = [];
      let list = this.data.filter((item, index) => {
        if (this.status === 0 || this.status === 1 || this.status === 2) {
          return (
            this.status === item.status &&
            item.class_name.includes(this.class_name)
          );
        } else {
          return true && item.class_name.includes(this.class_name);
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
    },
    handleSearch() {
      this.pageIndex = 1;
      this.getList();
    }
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
    box-shadow: 2px 2px 5px 0 #666;
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
</style>
