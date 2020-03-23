<template>
  <div class="home">
    <div>
      <swiper :options="swiperOption">
        <swiper-slide
          class="swiper-slide"
          v-for="(item,index) in slide"
          :key="index"
        >我是第{{item}}个轮播图</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- 分页 -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <!-- 箭头左 -->
        <div class="swiper-button-next" slot="button-next"></div>
        <!-- 箭头右 -->
      </swiper>
    </div>
    <ul class="tab">
      <li v-for="(item,index) in list" :key="index">
        <div>{{item.identity}}</div>
        <div>
          <span @click="go(item.path)" v-for="(item,index) in item.arr" :key="index">{{item.name}}</span>
        </div>
      </li>
    </ul>
    <el-tabs type="border-card">
      <el-tab-pane label="培训信息">
        <ul class="recruitment-list">
          <li
            @click="getRecruitmentInfo"
            v-for="(item,index) in dataList"
            :key="index"
          >{{item.title}}</li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="招聘信息">
        <ul class="recruitment-list">
          <li
            @click="getRecruitmentInfo"
            v-for="(item,index) in dataList"
            :key="index"
          >{{item.title}}</li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      slide: [1, 2, 3, 4, 5],
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
        loop: true,
        //开启鼠标滚轮控制Swiper切换
        mousewheel: true
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
      ]
    };
  },
  methods: {
    go(keypath) {
      this.$router.push({ path: keypath });
      console.log(keypath);
    },
    getRecruitmentInfo() {
      this.$router.push({path:'/showRecruitmentInfo'});
    }
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
  background-color: rosybrown;
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