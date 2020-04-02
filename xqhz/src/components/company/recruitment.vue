<template>
  <div class="continer">
    <div class="aside">
      <div @click="show(1)">发布招聘信息</div>
      <div @click="show(2)">招聘信息列表</div>
      <div @click="show(3)">培训投递列表</div>
    </div>
    <div class="page" v-if="isShow==1">
      <div class="header">
        <h3 class="title">招聘信息</h3>
      </div>
      <hr />
      <div class="set-note">
        <el-form :model="ruleForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
          <el-form-item label="招聘职位：" prop="rec_position">
            <el-input clearable v-model="ruleForm.rec_position"></el-input>
          </el-form-item>
          <el-form-item label="学历要求：" prop="rec_degree">
            <el-input clearable v-model="ruleForm.rec_degree"></el-input>
          </el-form-item>
          <el-form-item label="培训时间：" prop="rec_time">
            <el-date-picker
              v-model="ruleForm.rec_time"
              type="datetime"
              align="right"
              value-format="yyyy-MM-dd 00:00:00"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="招聘地点：" prop="rec_place_name">
            <el-input clearable v-model="ruleForm.rec_place_name"></el-input>
          </el-form-item>
          <el-form-item label="工作地点" prop="rec_work_place">
            <el-input clearable v-model="ruleForm.rec_work_place"></el-input>
          </el-form-item>
          <el-form-item label="职位描述：" prop="rec_content">
            <!-- <el-input  clearable v-model="ruleForm.rec_content"></el-input> -->
            <editor-bar v-model="ruleForm.rec_content" :isClear="isClear" @change="change"></editor-bar>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="edit">编辑</el-button>
            <el-button type="info" @click="postRecruitment">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="resume-list" v-if="isShow==2">
      <div>
        <h3>招聘信息列表</h3>
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
            <el-table-column label="职位名称" align="center">
              <template slot-scope="scope">
                <div @click="getTrainingInfo(scope.row)" class="active">{{scope.row.rec_position}}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="" label="" align="center"></el-table-column> -->
            <el-table-column prop="rec_time" label="招聘时间" align="center"></el-table-column>
            <el-table-column prop="rec_place_name" label="招聘地点" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
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
    <div class="resume-list" v-if="isShow==3">
      <div>
        <h3>培训投递列表</h3>
        <hr />
        <div>
          <el-table
            :data="tableData1"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
          >
            <!-- <el-table-column prop="id" label="ID" align="center"></el-table-column> -->
            <!-- <el-table-column prop="class_name" label="课程名" align="center"></el-table-column> -->
            <el-table-column label="职位名称" align="center">
              <template slot-scope="scope">
                <div @click="getTrainingInfo(scope.row)" class="active">{{scope.row.rec_position}}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="" label="" align="center"></el-table-column> -->
            <el-table-column prop="rec_time" label="招聘时间" align="center"></el-table-column>
            <el-table-column prop="rec_place_name" label="招聘地点" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
            <!-- <el-table-column prop="class_introduce" label="课程介绍" align="center"></el-table-column> -->
            <!-- <el-table-column prop="status" label="状态" align="center"></el-table-column> -->
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              layout="total, prev, pager, next"
              :current-page="pageIndex1"
              :page-size="pageSize1"
              :total="pageTotal1"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditorBar from "../wangEditor/wangEditor";
import {getList} from '../../assets/common'
export default {
  data() {
    return {
      ruleForm: {
        // rec_position: "", //职位
        rec_degree: "", //学历要求
        rec_time: "", //招聘时间
        rec_work_place: "", //工作地点
        rec_place_name: "", //招聘地点
        rec_content: "" //职位描述
      },
      test: "",
      isClear: false,
      detail: "",
      isShow: 1,
      pageIndex: 1,
      pageSize: 10,
      pageTotal: 0,
      tableData: [],
      pageIndex1: 1,
      pageSize1: 10,
      pageTotal1: 0,
      tableData1: [],
      data: []
    };
  },
  methods: {
    show(type) {
      this.isShow = type;
    },
    change(val) {
      console.log(val);
    },
    edit() {
      this.disabled = false;
    },
    //发布招聘信息
    postRecruitment() {
      console.log(this.ruleForm);
      this.$axios
        .post("/xqhz/company/postRecruitment", this.ruleForm)
        .then(res => {
          this.$message(res.msg);
        })
        .catch(err => {
          console.log(err);
        });
    },

    //获取企业招聘信息列表
    getSelfRecruitmentList() {
      this.$axios
        .post("/xqhz/company/getSelfRecruitmentList", {})
        .then(res => {
          getList(this.tableData, res.data, this.pageIndex, this.pageSize,this.pageTotal);
          console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取招聘投递列表
    getDeliveryRecordList() {
      this.$axios
        .post("/xqhz/company/getDeliveryRecordList", {})
        .then(res => {
          this.getList(
            this.tableData1,
            res.data,
            this.pageIndex1,
            this.pageSize1,
            this.pageTotal1
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    //处理数据
    // getList(tableData, data, pageIndex, pageSize,pageTotal) {
    //   console.log(this.tableData)
    //   tableData = data.filter(
    //     (item, index) =>
    //       index < pageIndex * pageSize &&
    //       index >= pageSize * (pageIndex - 1)
    //   );
    //   // tableData.forEach(item => {
    //   //   if (item.status == 0) {
    //   //     item.status = "待审核";
    //   //   } else if (item.status == 1) {
    //   //     item.status = "已通过";
    //   //   } else {
    //   //     item.status = "未通过";
    //   //   }
    //   // });
    //   pageTotal = data.length;
    //   console.log(this.tableData)
    //   console.log(this.pageTotal)
    // },
    // 分页导航
    handlePageChange(val) {
      this.pageIndex = val;
      this.getList();
    }
  },
  created() {
    this.getSelfRecruitmentList();
  },
  components: {
    EditorBar
  }
};
</script>
<style lang='scss' scoped>
.continer {
  margin: 50px 100px 50px 300px;

  display: flex;
  // width: 100%;
  .aside {
    margin-right: 30px;
    position: fixed;
    top: 110px;
    left: 100px;
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
  }
  .page {
    margin: 0 auto;
    padding: 10px 50px;
    box-shadow: 2px 2px 5px 0 #666;
    background-color: #fff;
    width: 100%;
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
</style>
