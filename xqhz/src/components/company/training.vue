<template>
  <div class="continer">
    <div class="aside">
      <div @click="show(1)">发布培训信息</div>
      <div @click="show(2)">培训信息列表</div>
      <div @click="show(3)">培训报名列表</div>
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
              range-separator="~"
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
            <el-button type="primary" @click="edit">编辑</el-button>
            <el-button type="info" @click="postTraining">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="page" v-if="isShow==2">
      <h3>培训信息列表</h3>
      <hr />
      <div>
        <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
        >
          <!-- <el-table-column prop="id" label="ID" align="center"></el-table-column> -->
          <!-- <el-table-column prop="class_name" label="课程名" align="center"></el-table-column> -->
          <el-table-column label="课程名" align="center">
            <template slot-scope="scope">
              <div @click="getTrainingInfo(scope.row)" class="active">{{scope.row.class_name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="class_teacher" label="讲师" align="center"></el-table-column>
          <el-table-column prop="class_time" label="培训时间" align="center"></el-table-column>
          <el-table-column prop="class_place" label="培训地址" align="center"></el-table-column>
          <el-table-column prop="apply_time" label="报名时间" align="center"></el-table-column>
          <!-- <el-table-column prop="class_introduce" label="课程介绍" align="center"></el-table-column> -->
          <!-- <el-table-column prop="status" label="状态" align="center"></el-table-column> -->
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
      pageTotal: null,
      isClear: false
    };
  },
  methods: {
    show(index) {
      this.isShow = index;
    },
    change(val) {
      this.class_content = val;
      console.log(val);
    },
    edit() {
      this.disabled = false;
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
    // 分页导航
    handlePageChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    //获取数据
    getData() {
      this.$axios
        .post("/xqhz/company/training", {})
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
        item.rec_name.includes(this.rec_name)
      );

      this.tableData = list.filter(
        (item, index) =>
          index < this.pageIndex * this.pageSize &&
          index >= this.pageSize * (this.pageIndex - 1)
      );
      this.pageTotal = list.length;
    }
  },

  components: {
    EditorBar
  }
};
</script>
<style lang='scss' scoped>
// .register {
//   margin: 50px 150px;

//   background-color: #fff;
// }

.continer {
  margin: 50px 100px 50px 300px;
  display: flex;
  // width: 100%;
  .aside {
    margin-right: 30px;
    position: fixed;
    top:110px;
    left: 100px;
    div {
      padding: 5px;
      padding-left: 1rem;
      height: 30px;
      line-height: 30px;
      margin-top: 4px;
      background-color: #fafafa;
      min-width: 150px;
      cursor: pointer;
      color: #505459;
    }
  }
  .page {
    margin: 0 auto;
    padding: 10px 50px;
    box-shadow: 2px 2px 5px 0 #666;
    background-color: #fff;
    width:100%;
    .set-note {
      margin-top: 30px;
    }
  }
}
</style>
<style lang="scss">
.el-input {
  width: 400px;
}
.el-form-item__label {
  text-align: left;
}
</style>