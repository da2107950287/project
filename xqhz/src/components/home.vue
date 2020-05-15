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
        <div class="see_more" @click="seeMore('/trainingList')">查看更多</div>
      </div>
      <div class="panel-body">
        <table class="table">
    
          <tbody>
            <tr v-for="(item,index) in trainingList" :key="index">
              <td class="post-sort" @click="getTrainingInfo(item.tid)">
               
                {{item.class_name}}
              </td>
              <td class="post-intro">{{item.class_teacher}}</td>
              <td class="post-time">{{item.class_time}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="panel-title">招聘信息</div>
        <div class="see_more" @click="seeMore('/recruitmentList')">查看更多</div>
      </div>
      <div class="panel-body">
        <table class="table">
          <!-- <thead>
            <tr>
              <th>职位名称</th>
              <th>企业名称</th>
              <th>招聘日期</th>
            </tr>
          </thead>-->
          <tbody>
            <tr v-for="(item,index) in recruitmentList" :key="index">
              <td class="post-sort" @click="getRecruitmentInfo(item.rid)">{{item.rec_position}}</td>
              <td class="post-intro">{{item.rec_name}}</td>
              <td class="post-time">{{item.rec_time}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="panel-title" style="margin:0 auto; color:#333;font-size: 16px; ">企业展示</div>
      </div>
      <div class="panel-body">
        <div class="company-box">
          <a
            class="post-sort company"
            style="width:33%;text-decoration: none;"
            v-for="(item,index) in companyList"
            :key="index"
            :href="item.rec_page"
          >{{item.rec_name}}</a>
        </div>
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
        autoplay: {
          delay: 2000
        },
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
      recruitmentList: [],
      companyList: []
    };
  },
  methods: {
    //查看更多
    seeMore(keypath) {
      this.$router.push({ path: keypath });
    },
    //获取培训信息列表
    getTrainingList() {
      this.$axios
        .post("/xqhz/company/getTrainingList", {})
        .then(res => {
          console.log(res.data);
          this.trainingList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //去培训信息详情页
    getTrainingInfo(tid) {
      this.$router.push({
        path: "/trainingInfo",
        query: { tid }
      });
    },
    //去招聘信息详情页
    getRecruitmentInfo(rid) {
      this.$router.push({
        path: "/recruitmentInfo",
        query: { rid }
      });
    },
    //获取培训信息列表
    getRecruitmentList() {
      this.$axios
        .post("/xqhz/company/getRecruitmentList", {})
        .then(res => {
          this.recruitmentList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取公司列表
    getCompanyList() {
      this.$axios
        .post("/xqhz/company/getCompanyList", {})
        .then(res => {
          this.companyList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getTrainingList();
    this.getRecruitmentList();
    this.getCompanyList();
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
  height: 300px;
  text-align: center;
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
        cursor: default;
      }
    }
  }
  .panel {
    margin-top: 20px;
    background-color: #fff;
    border: 1px solid #efefef;
    // border-radius: 4px;
    // box-shadow: #ccc 0 0px 4px;
    padding-bottom: 30px;
    .panel-heading {
      color: #333333;
      background-color: #fbfbfb;
      // border-top: 3px solid #60b0f4;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      .panel-title {
        color: #333;
      }
      .see_more {
        border: none;
        font-size: 12px;
        color: rgb(30, 100, 159);
        text-align: center;
        cursor: default;
      }
    }
    .panel-body {
      padding: 0 20px;
      // box-shadow: #ccc 0 0px 4px;
      .table {
        width: 100%;
        max-width: 100%;
        color: #333333;
        background-color: #fff;
        table-layout: fixed;
        border-collapse: collapse;

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
            border-bottom: 2px dotted #f1f1f1;
          }
          .post-sort {
            color: #4a90e6;
            cursor: default;
            display: flex;
            align-items: center;
            i {
              display: block;
              height: 3px;
              width: 3px;
              border-radius: 50%;
              background-color: #333;
              margin-right: 5px;
            }
          }
            .post-sort:hover{
          color: #1e649f;
          text-decoration: solid;
          }
          .post-time{
           color: #999
          }
        }
        
      }
      .company-box {
        display: flex;
        flex-wrap: wrap;
        .post-sort {
          line-height: 35px;
          height: 35px;
          font-size: 14px;
          color: #005976;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: default;
          text-align: center;
        }
        .post-sort:hover {
          color: #ff4f00;
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
      cursor: default;
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