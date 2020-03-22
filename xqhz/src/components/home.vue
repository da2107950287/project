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
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <div>{{item.identity}}</div>
        <div >
          <span @click="go(item.path)" v-for="(item,index) in item.arr" :key="index">{{item.name}}</span>
        </div>
      </li>
    </ul>
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
        { identity: "学生", arr: [{name:"登录",path:'/login'}] },
        { identity: "用人单位", arr: [{name:"登录",path:'/login'}, {name:"注册",path:'/register'}] },
        { identity: "管理员", arr: [{name:"登录",path:'/login'}] }
      ]
    };
  },
  methods:{
      go(keypath){
          this.$router.push({path:keypath})
          console.log(keypath)
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
  margin: 0 100px;
  ul {
    display: flex;
    justify-content: space-between;

    li {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 33%;
      background-color: #654;
      color: #fff;
      height: 80px;
      >div:first-child {
        font-size: 22px;
      }
      >div:last-child{
         display: flex;
        flex-direction: column;
        cursor: pointer;
      }
    }
  }
}
 
</style>