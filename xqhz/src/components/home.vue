<template>
  <div class="home">
    <div>
      <swiper :options="swiperOption">
        <swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index">
          <img :src="item" class="swiper-img" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- 分页 -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <!-- 箭头左 -->
        <div class="swiper-button-next" slot="button-next"></div>
        <!-- 箭头右 -->
      </swiper>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="panel-title">培训信息</div>
      </div>
      <div class="panel-body">
        <table class="table">
          <thead>
            <tr>
              <th>课程名</th>
              <th>培训讲师</th>
              <th>培训时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in trainingList" :key="index">
              <td class="post-sort" @click="getTrainingInfo(item)">{{item.class_name}}</td>
              <td class="post-intro">{{item.class_teacher}}</td>
              <td class="post-time">{{item.class_time}}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td class="see_more" @click="seeMore('/trainingList')">查看更多</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="panel-title">招聘信息</div>
      </div>
      <div class="panel-body">
        <table class="table">
          <thead>
            <tr>
              <th>职位名称</th>
              <th>企业名称</th>
              <th>招聘日期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in recruitmentList" :key="index">
              <td class="post-sort" @click="getRecruitmentInfo(item)">{{item.rec_position}}</td>
              <td class="post-intro">{{item.rec_name}}</td>
              <td class="post-time">{{item.rec_time}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="panel-title">企业展示</div>
      </div>
      <div class="panel-body">
        <table class="table">
          <!-- <thead>
            <tr>
              <th>课程名</th>
              <th>讲师</th>
              <th>培训时间</th>
            </tr>
          </thead> -->
          <tbody>
            <tr>
              <!-- <td class="post-sort" style="width:33%" v-for="">{{}}</td> -->
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <img src alt />
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      slide: [
        require("../assets/img/swiper_1.jpg"),
        require("../assets/img/swiper_2.jpg"),
        require("../assets/img/swiper_3.jpg"),
        require("../assets/img/swiper_4.jpg")
      ],
      //设置属性
      swiperOption: {
        //显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
        //设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        //自动轮播
        // autoplay: {
        //   delay: 2000
        // },
        //开启循环模式
        loop: true
        //开启鼠标滚轮控制Swiper切换
      },
      list: [
        { identity: "学生", arr: [{ name: "登录", path: "/login" }] },
        {
          identity: "用人单位",
          arr: [
            { name: "登录", path: "/login" },
            { name: "注册", path: "/register" }
          ]
        },
        { identity: "管理员", arr: [{ name: "登录", path: "/login" }] }
      ],
      dataList: [
        { title: "【军队文职专栏】军队文职招聘信息汇总 3月16日更新", id: 1 },
        { title: "【军队文职专栏】军队文职招聘信息汇总 3月16日更新", id: 2 },
        { title: "【军队文职专栏】军队文职招聘信息汇总 3月16日更新", id: 3 }
      ],
      trainingList: [],
      recruitmentList:[]
    };
  },
  methods: {
 
    seeMore(keypath) {
      this.$router.push({ path: keypath });
    },
    getTrainingList() {
      this.$axios
        .post("/xqhz/company/getTrainingList", {})
        .then(res => {
          console.log(res);
          this.trainingList = res.data;
          console.log(this.trainingList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTrainingInfo(data) {
      console.log(data);
      this.$router.push({
        path: "/trainingInfo",
        query: { data: JSON.stringify(data) }
      });
    },
    getRecruitmentInfo(data){
this.$router.push({path:'/recruitmentInfo',query:{data:JSON.stringify(data)}})
    },
    getRecruitmentList(){
      this.$axios.post('/xqhz/company/getRecruitmentList',{}).then(res=>{
        this.recruitmentList=res.data;
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created() {
    this.getTrainingList();
    this.getRecruitmentList()
  }
};
</script>

<style lang="scss">
ul,
ol,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.swiper-slide {
  width: 100%;
  height: 500px;
  line-height: 500px;
  font-size: 50px;
  text-align: center;
  // background-color: rosybrown;
  .swiper-img {
    width: 100%;
    height: 100%;
  }
}
.home {
  margin: 0 150px;
  ul.tab {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-top: 5px;

    li {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 33%;
      background-color: #654;
      color: #fff;
      height: 80px;
      > div:first-child {
        font-size: 22px;
      }
      > div:last-child {
        display: flex;
        flex-direction: column;
        cursor: pointer;
      }
    }
  }
  .panel {
    margin-top: 20px;
    background-color: #ffffff;
    border: 1px solid #efefef;
    border-radius: 4px;
    .panel-heading {
      color: #333333;
      background-color: #ccc;
      border-color: #dddddd;
      padding-left: 20px;
      height: 50px;
      line-height: 50px;
    }
    .panel-body {
      padding: 0 20px;
      .table {
        width: 100%;
        max-width: 100%;
        color: #333333;
        background-color: transparent;
        table-layout: fixed;
        border-collapse: collapse;
        th {
          text-align: left;
          border-bottom: 2px solid #f6f6f6;
        }
        th,
        td {
          padding: 8px;
          overflow: hidden;
          padding-right: 10px !important;
          padding-left: 10px !important;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
        }
        tr {
          td {
            line-height: 1.42857143;
            vertical-align: top;
            border-bottom: 2px dotted #f6f6f6;
          }
          .post-sort {
            color: #4a90e6;
            cursor: pointer;
          }
          .see_more {
            border: none;
            font-size: 12px;
            color:#ccc;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
  }
  .informaton_box {
    background-color: #fff;
    box-shadow: 2px 2px 5px 0 #666;
    margin-top: 20px;
    padding: 10px;
    div.title {
      font-weight: bold;
      font-size: 18px;
    }
    ul {
      margin-top: 10px;
      li {
        display: flex;
        justify-content: space-between;
        line-height: 25px;
        border-bottom: 1px solid #777;
        div {
        }
      }
      li:first-child {
        font-weight: bold;
        border-top: 1px solid #777;
      }
    }
  }
  ul.recruitment-list {
    li {
      border-bottom: 1px dashed #eae8e8;
      margin-bottom: 10px;
      padding-bottom: 10px;
      font-size: 16px;
      color: #34495e;
      cursor: pointer;
    }
  }
  .el-tabs__item {
    color: #303133;
    font-size: 16px;
  }
  .el-tabs__item.is-active {
    font-size: 16px;
    color: #666;
  }
  .el-tabs__item:not(.is-disabled):hover {
    color: #666;
  }
}
</style>