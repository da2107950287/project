<template>
  <div class="continer">
    <div class="aside">
      <div @click="show(1)">个人简历</div>
      <div @click="show(2)">简历投递管理</div>
    </div>
    <div v-if="isShow==1" class="resume">
      <!-- class="upload-container"
        ref="upload"
        action="http://localhost:81/xqhz/upload/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        list-type="picture-card"
        :limit="1"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
        :on-success="handleSucess"
      :on-error="handleError"-->
      <!-- <el-upload
   
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
      <!-- <el-button slot="trigger" size="small" type="primary">s</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10M</div>-->
      <!-- </el-upload> -->
      <p class="my-resume">我的简历</p>
      <div class="handle">
        <el-upload
          class="upload-demo"
          drag
          ref="upload"
          action="http://localhost:81/xqhz/upload/insertSelfResume"
          :show-file-list="false"
          :data="token"
          :on-success="handleSucess"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <em>上传简历附件</em>
          </div>

          <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
        <div class="del-resume" @click="delSelfResume">删除简历</div>
      </div>
      <div v-show="fileType === 'pdf'&&src!=''">
        <pdf
          class="pdf"
          :src="src"
          :page="currentPage"
          @num-pages="pageCount=$event"
          @page-loaded="currentPage=$event"
          @loaded="loadPdfHandler"
        ></pdf>
        <p class="arrow">
          <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">上一页</span>
          {{currentPage}} / {{pageCount}}
          <span
            @click="changePdfPage(1)"
            class="turn"
            :class="{grey: currentPage==pageCount}"
          >下一页</span>
        </p>
        <!-- // 自己引入就可以使用,这里我的需求是做了分页功能,如果不需要分页功能,只要src就可以了 -->
      </div>
      <div v-show="src==''" class="none">暂无简历，请上传简历</div>
    </div>
    <div class="resume-list" v-if="isShow==2">
      <div>
        <h3>招聘投递记录</h3>
        <hr />
        <div>
          <el-table
            :data="tableData"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
          >
            <el-table-column label="投递职位" align="center">
              <template slot-scope="scope">
                <div @click="getTrainingInfo(scope.row)" class="active">{{scope.row.rec_position}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="rec_name" label="投递公司" align="center"></el-table-column>
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
import pdf from "vue-pdf";
export default {
  data() {
    return {
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: "pdf", // 文件类型
      src: "", // pdf文件地址
      isShow: 1,
      pageIndex: 1,
      pageSize: 10,
      pageTotal: 1,
      data: [],
      tableData: [],
      filename: "",
      rec_position:""
    };
  },
  computed: {
    token() {
      if (localStorage.getItem("token")) {
        return { token: localStorage.getItem("token") };
      }
    }
  },
  methods: {
    show(type) {
      this.isShow = type;
      if (type == 1) {
        this.getSelfResume();
      } else {
        this.getSelfDeliveryList();
      }
    },
    delSelfResume() {
      this.$axios
        .post("/xqhz/student/delSelfResume", {})
        .then(res => {
          this.$message(res.msg);
          window.location.reload();
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
    getSelfDeliveryList() {
      this.$axios
        .post("/xqhz/student/getSelfDeliveryList", {})
        .then(res => {
          this.data = res.data;
          console.log(this.data);
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 处理数据
    getList() {
      let list = this.data.filter((item, index) =>
        item.rec_position.includes(this.rec_position)
      );
      list.forEach((item,index)=>{
        item.delivery=item.delivery.replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
      })
      this.tableData = list.filter(
        (item, index) =>
          index < this.pageIndex * this.pageSize &&
          index >= this.pageSize * (this.pageIndex - 1)
      );
      console.log(this.tableData)
      this.pageTotal = list.length;
    },
    handleEdit() {
      this.editVisible = true;
    },

    changePdfPage(val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
        // console.log(this.currentPage)
      }
    },

    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1; // 加载的时候先加载第一页
    },

    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      fileList.splice(file, 1);
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //图片上传前
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "application/pdf";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG || !isLt2M) {
        this.$notify({
          title: "提示",
          message: "只能上传 pdf文件，且不超过10M",
          type: "warning",
          duration: 3000
        });
      }
      return isJPG && isLt2M;
    },
    //上传成功过后
    handleSucess(response, file, fileList) {
      console.log(99);
      console.log(response);
      if (response.code == 0) {
        let data = response.data;

        // let file = {};
        // file.name = data.name;
        // file.url = self.$store.state.imgurlhttp + data.url;
        // self.fileList[0] = file;
        this.src = data.url;
        console.log(this.src);
        return;
      } else {
        this.$notify({
          title: "失败",
          message: response.message,
          type: "warning",
          duration: 2000
        });
      }
    },
    //上传失败
    handleError(err, file, fileList) {
      console.log(err);
      this.$notify({
        title: "失败",
        message: "上传失败",
        type: "warning",
        duration: 2000
      });
    },
    getSelfResume() {
      this.$axios
        .post("/xqhz/student/getSelfResume", {})
        .then(res => {
          this.src = res.data.url;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getSelfResume();
  },
  components: {
    pdf
  }
};
</script>
<style lang="scss" >
ol,
ul,
li {
  list-style: none;
}
.continer {
  margin: 50px 100px;
  display: flex;
  .aside {
    margin-right: 30px;
    // background-color: #fafafa;
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
  .resume {
    margin: 0 auto;
    padding: 10px 50px;
    width: 100%;
    min-height: 300px;
    background-color: #fff;
    .my-resume {
      margin: 0 auto;

      height: 36px;
      line-height: 36px;
      font-size: 15px;
      border-left: 4px solid #ccd2e0;
      color: #3b3f4f;
      background: #f5f6f9;
      padding-left: 16px;
      border-radius: 1px;
      margin: 20px 0;
    }
    .handle {
      margin-bottom: 30px;
      display: flex;
      .upload-demo {
        margin-right: 20px;
        height: 40px;
        .el-upload-dragger {
          height: 40px;
          width: 150px;
          display: flex;
          padding: 0 16px;
          line-height: 40px;
          align-items: center;
          .el-icon-upload {
            font-size: 18px;

            margin: 0 5px 0;
          }
        }
      }
      .del-resume {
        height: 38px;
        padding: 0 16px;
        line-height: 38px;
        width: 56px;
        border-radius: 2px;
        font-size: 14px;
        border: 1px dashed #d9d9d9;
        color: #409eff;
        cursor: pointer;
      }
    }

    .pdf {
      border: 1px dashed #b4bcc9;
      // margin-top: 20px;
    }
    .none {
      border: 1px dashed #b4bcc9;
      height: 200px;
      width: 200px;
      line-height: 200px;
      text-align: center;
      color: #ccc;
    }
  }
  .resume-list {
    margin: 0 auto;
    padding: 10px 50px;
    width: 100%;
    background-color: #fff;
    .recruitment-delivery-list {
      margin: 0 10px;

      width: 100%;
      border: 1px solid #ccc;

      padding: 10px 50px;
    }
  }
}
.el-dialog {
  overflow: scroll;
  white-space: nowrap;
  height: 500px;
}
</style>