<template>
  <div class="continer">
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
      src: "" // pdf文件地址
    };
  },
  methods: {
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
    }
  },created(){
    this.src=  this.$route.query.url;
  },components:{
      pdf
  }
};
</script>
<style scoped>
.continer{
    margin: 50px 100px;
    background-color: #fcfcfc;
}
</style>