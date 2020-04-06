<template>
    <div class="show-pdf">
    <div>
      <pdf
        v-if="pdfSrc"
        :src="pdfSrc"
        :page="currentPage"
        @num-pages="pageCount=$event"
        @page-loaded="currentPage=$event"
        @loaded="loadPdfHandler"
      ></pdf>
    </div>

    <p class="arrow2" v-if="pdfSrc">
      <span @click="changePdfPage(0)" :class="{grey: currentPage==1}">上一页</span>
      {{currentPage}} / {{pageCount}}
      <span
        @click="changePdfPage(1)"
        :class="{grey: currentPage==pageCount}"
      >下一页</span>
    </p>
  </div>
</template>
<script>
import pdf from "vue-pdf";
export default {
  components: {
    pdf
  },
  props: ["dochref", "doctype"],
  watch: {
    dochref(val) {
      console.log("pdfSrc");
      console.log(val);
      this.pdfSrc = val;
    },
    pdfSrc(val) {},
    doctype(typeval) {
      this.typeValue = typeval;
    }
  },

  data() {
    return {
      typeValue: "",
      pdfSrc: "",
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      numPages: 1,
      activeIndex: 0
    };
  },
  methods: {
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1; // 加载的时候先加载第一页
    }
  },
  mounted: function() {
    this.pdfSrc = "";
    this.pdfSrc = this.dochref;
  }
};
</script>