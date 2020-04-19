<template>
  <div class="consult">
    <div class="page">
      <div class="header">
        <h3 class="title">咨询中心</h3>
        <div class="handle-box">
          <div class="handle-box">
            <el-input v-model="keyword" placeholder="请输入搜索内容" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          </div>
          <div>
            <el-button type="text" @click="dialogFormVisible = true" class="btn">+ 发布咨询</el-button>
            <el-dialog title="发布咨询" :visible.sync="dialogFormVisible">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="textarea"
                show-word-limit="100"
              ></el-input>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="postConsult">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
      <hr />
      <ul class="set-note">
        <li v-for="(item,index) in consultContent" :key="index">
          <div @click="open(item.cid)">
            <img src="../assets/img/arrow_right.png" v-if="item.cid!==selected" />
            <img src="../assets/img/arrow_down.png" v-if="item.cid==selected" />
            {{item.question}}
          </div>
          <div v-if="item.cid==selected" class="answer">
            <span>管理员回复：</span>
            {{item.answer}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      textarea: "",
      consultContent: [],
      selected: -1,
      keyword:"",
    };
  },
  methods: {
    open(selected_id) {
      if (selected_id != this.selected) {
        this.selected = selected_id;
      } else {
        this.selected = false;
      }
    },
    postConsult() {
      this.dialogFormVisible = false;
      this.$axios
        .post("/xqhz/consult/postConsult", { question: this.textarea })
        .then(res => {
          this.$message(res.msg);
          this.textarea = "";
        })
        .catch(err => {
          console.log(err);
        });
    },
    getConsultList() {
      this.$axios
        .post("/xqhz/consult/getConsultList", {})
        .then(res => {
          this.consultContent = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
     handleSearch() {
       this.$axios
        .post("/xqhz/consult/search", {keyword:this.keyword})
        .then(res => {
          this.consultContent = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  created() {
    this.getConsultList();
  }
};
</script>
<style lang='scss' scoped>
ol,
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.consult {
  margin: 50px 150px;
  background-color: #fff;
  .page {
    margin: 0 auto;
    padding: 10px 50px;
    box-shadow: 2px 2px 5px 0 #666;
    .header {
      .handle-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .handle-input{
          margin-right: 10px;
        }
        
      }
      .btn {
        padding: 9px 13px;
        font-size: 13px;
        color: #ffffff;
        background-color: #e74c3c;
        border-radius: 5px;
      }
    }
    ul.set-note {
      margin: 10px 0;
      li {
        color: #005976;
        padding: 5px 10px;
        border-top: 1px solid #ddd;
        font-size: 14px;
        div:first-child {
          img {
            width: 14px;
            height: 14px;
            margin-right: 5px;
          }
        }
        .answer {
          margin-left: 22px;
          color: #1abc9c;
          span {
            font-weight: bold;
          }
        }
      }
      li:nth-child(2n-1) {
        background-color: #f9f9f9;
      }
      li:first-child {
        border-top: 1px solid #ddd;
      }
      li:last-child {
        border-bottom: 1px solid #ddd;
      }
    }
  }
}
</style>
