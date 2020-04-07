<template>
  <div class="continer">
    <div class="aside">
      <div @click="show(1)">发布招聘信息</div>
      <div @click="show(2)">招聘信息列表</div>
      <div @click="show(3)">培训投递列表</div>
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
            <!-- <el-input  clearable v-model="ruleForm.rec_content"></el-input> -->
            <editor-bar v-model="ruleForm.rec_content" :isClear="isClear" @change="change"></editor-bar>
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
          <el-input v-model="postion" placeholder="职位名称" class="handle-input mr10"></el-input>
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
                <div @click="getTrainingInfo(scope.row)" class="active">{{scope.row.rec_position}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="rec_time" label="招聘时间" align="center"></el-table-column>
            <el-table-column prop="rec_place_name" label="招聘地点" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center" ></el-table-column>
            
               <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-view"
              @click="handleSee( scope.row)"
            >查看</el-button>
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
        <h3>培训投递列表</h3>
       
        <div class="handle-box">
          <!-- <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
          >批量删除</el-button>-->
          <el-input v-model="postion" placeholder="职位名称" class="handle-input mr10"></el-input>
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
            <!-- <el-table-column prop="id" label="ID" align="center"></el-table-column> -->
            <!-- <el-table-column prop="class_name" label="课程名" align="center"></el-table-column> -->
            <el-table-column label="职位名称" align="center">
              <template slot-scope="scope">
                <div @click="getTrainingInfo(scope.row)" class="active">{{scope.row.rec_position}}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="" label="" align="center"></el-table-column> -->
            <el-table-column prop="username" label="投递人" align="center"></el-table-column>
            <el-table-column prop="delivery_time" label="投递时间" align="center"></el-table-column>
            <!-- <el-table-column prop="status" label="状态" align="center"></el-table-column> -->
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
      isClear:false,
      data: [],
      isPost:true,
    };
  },
  methods: {
    show(type) {
      this.isShow = type;
      if(type==1){
        this.ruleForm={};
        this.isPost=true;
      }else
      if(type==2){
        this.getSelfRecruitmentList()
      }else if(type==3){
        this.getDeliveryRecordList();
      }
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
          this.data = res.data;
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList() {
      this.tableData=[];
      let list = this.data.filter((item, index) =>
        item.rec_position.includes(this.postion)
      );
      list.forEach((item,index)=>{
        if(item.delivery_time){
          item.delivery_time=item.delivery_time.replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
        }if(item.rec_time){
          item.rec_time=item.rec_time.replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
        }
      })
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
          this.data=res.data;
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
    handleSee(data){
       this.ruleForm=data;
      this.isShow=1;
      this.isPost=false;
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
.el-input {
  width: 300px;
}
 .el-input__inner,
    .el-input {
      width: 300px;
      height: 35px;
      display: inline-block;
    }
   
.handle-input {
  width: 300px;
  display: inline-block;
}
</style>
