<template>
  <div class="consult">
    <div class="page">
      <div class="header">
        <h3 class="title">咨询中心</h3>
        <div>
          <el-button type="text" @click="dialogFormVisible = true" class="btn">+ 发布咨询</el-button>
          <el-dialog title="发布咨询" :visible.sync="dialogFormVisible">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="textarea"
            ></el-input>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="postConsult">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
      <hr />
      <ul class="set-note">
        <li v-for="(item,index) in consultContent" :key="index">
          <div @click="open(item.id)">
            <img src="../assets/img/arrow_right.png" v-if="item.id!==selected" />
            <img src="../assets/img/arrow_down.png" v-if="item.id==selected" />
            {{item.request}}
          </div>
          <div v-if="item.id==selected" class="answer">{{item.answer}}</div>
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
      selected: -1
    };
  },
  methods: {
    open(selected_id) {
      if(selected_id!=this.selected){
this.selected = selected_id;
      }else{
        this.selected=false
      }
      

    },
    postConsult() {
      this.dialogFormVisible = false;
      // this.$axios.post('/xqhz/postConsult',{consult_content:this.textarea}).then(res=>{
      //   console.log(res);
      // }).catch(err=>{
      //   console.log(err);
      // })
    }
  },
  created() {
    this.$axios.post('/xqhz/getConsult').then(res=>{
      
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
    // let data = [
    //   { id: 1, request: "Karen", answer: "Linda" },
    //   { id: 2, request: "Scott", answer: "Donna" },
    //   { id: 3, request: "Scott", answer: "Sandra" },
    //   { id: 4, request: "Dorothy", answer: "Barbara" },
    //   { id: 5, request: "Ronald", answer: "Jennifer" },
    //   { id: 6, request: "Betty", answer: "Carol" },
    //   { id: 7, request: "Richard", answer: "Kimberly" },
    //   { id: 8, request: "John", answer: "Robert" }
    // ];
    // this.consultContent = data;
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
      display: flex;
      justify-content: space-between;
      align-items: center;
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
          display: flex;
          align-items: center;
          padding:2px 4px;
          img {
            width: 14px;
            height: 14px;
            margin-right: 5px;
          }
        }
       .answer{
          margin-left:22px
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
