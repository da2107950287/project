<template>
  <div class="continer">
    <div class="aside">
      <div @click="show(1)" :class="[isShow==1?'selected':'']">发布招聘信息</div>
      <div @click="show(2)" :class="[isShow==2?'selected':'']">招聘信息列表</div>
      <div @click="show(3)" :class="[isShow==3?'selected':'']">岗位投递列表</div>
    </div>
    <div class="page" v-if="isShow==1">
      <div class="header">
        <h3 class="title">发布招聘信息</h3>
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
          <el-form-item label="招聘时间：" prop="rec_time">
            <el-date-picker
              v-model="ruleForm.rec_time"
              type="datetime"
              align="right"
              placeholder="选择日期"
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
            <editor-bar v-model="ruleForm.rec_content" :isClear="isClear" ></editor-bar>
          </el-form-item>
          <el-form-item class="btns">
            <el-button v-if="isPost==true" type="danger" @click="postRecruitment">发布</el-button>
            <el-button v-else type="danger" @click="postRecruitment">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="resume-list" v-if="isShow==2">
      <div class="header">
        <h3>招聘信息列表</h3>
        <div class="handle-box">
          <el-select v-model="status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input v-model="postion" placeholder="请输入职位名称" class="handle-input mr10"></el-input>

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
            <el-table-column label="职位名称" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <div @click="getRecruitmentInfo(scope.row.rid)" class="active">{{scope.row.rec_position}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="rec_time" label="招聘时间" align="center"></el-table-column>
            <el-table-column prop="rec_place_name" label="招聘地点" align="center"></el-table-column>
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
    </div>
    <div class="resume-list" v-if="isShow==3">
      <div class="header">
        <h3>岗位投递列表</h3>

        <div class="handle-box">
        
          <el-input v-model="postion" placeholder="请输入职位名称" class="handle-input mr10"></el-input>
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
          
            <el-table-column label="职位名称" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <div @click="getRecruitmentInfo(scope.row.rid)" class="active">{{scope.row.rec_position}}</div>
              </template>
            </el-table-column>
      
            <el-table-column prop="username" label="投递人" align="center"></el-table-column>
            <el-table-column label="简历" align="center">
              <template slot-scope="scope">
                <div @click="showResume(scope.row.url)" class="active">{{scope.row.filename}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="delivery_time" label="投递时间" align="center"></el-table-column>
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
  </div>
</template>
<script>
import EditorBar from "../wangEditor/wangEditor";
import { getList } from "../../assets/common";
export default {
  data() {
    return {
      ruleForm: {
        rec_position: "", //职位
        rec_degree: "", //学历要求
        rec_time: "", //招聘时间
        rec_work_place: "", //工作地点
        rec_place_name: "", //招聘地点
        rec_content: "" //职位描述
      },
      postion: "",
      test: "",
      isClear: false,
      detail: "",
      isShow: 1,
      pageIndex: 1,
      pageSize: 10,
      pageTotal: 0,
      tableData: [],
      isClear: false,
      data: [],
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
    show(type) {
      this.isShow = type;
      if (type == 1) {
        this.ruleForm = {};
        this.isPost = true;
      } else if (type == 2) {
        this.getSelfRecruitmentList();
      } else if (type == 3) {
        this.getDeliveryRecordList();
      }
    },
   
    showResume(url) {
      this.$router.push({ path: "/showResume", query: { url: url } });
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
          this.data = res.data;
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList() {
      this.tableData = [];
      let list = this.data.filter((item, index) => {
       
          if (this.status === 0 || this.status === 1 || this.status === 2) {
            return (
              this.status === item.status &&
              item.rec_position.includes(this.postion)
            );
          } else {
            return true && item.rec_position.includes(this.postion);
          }
       
      });
       console.log(list)
      list.forEach((item, index) => {
        if (item.delivery_time) {
          item.delivery_time = item.delivery_time
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
        }
        if (item.rec_time) {
          item.rec_time = item.rec_time
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
    //获取招聘投递列表
    getDeliveryRecordList() {
      this.$axios
        .post("/xqhz/company/getDeliveryRecordList", {})
        .then(res => {
          this.data = res.data;
          this.getList();
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
    handleSearch() {
      this.pageIndex = 1;
      this.getList();
    },
    handleEdit(data) {
      this.ruleForm = data;
      this.isShow = 1;
      this.isPost = false;
    },
    getRecruitmentInfo(rid) {
      this.$router.push({
        path: "/recruitmentInfo",
        query: {rid }
      });
    },
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
.active{
      color:#4a90e6;
      cursor: default;
    }
    .active:hover{
      color:#FF4F00
    }
.el-input__inner,
.el-input {
  width: 300px;
  // height: 35px;
  // display: inline-block;
}

// .handle-input {
//   width: 300px;
//   display: inline-block;
// }
</style>
