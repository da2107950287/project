<template>
  <div>
    <el-upload
      class="upload-demo"
      action
      :on-change="handleChange"
      :on-remove="handleRemove"
      :limit="limitUpload"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      :auto-upload="false"
    >
    <!-- :file-list="fileListUpload" -->
     <!-- :on-exceed="handleExceed" -->
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div>
    </el-upload>
    <div @click="getExcel(res)">导出</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        limitUpload:1,
        res:[{name:'小白',age:'18'},{name:'小黑',age:'16'}]
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.importfxx(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！"
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！"
        });
      }
    },

    handleRemove(file, fileList) {
      this.fileTemp = null;
    },
    importfxx(obj) {
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj;
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          this.da = [...outdata];
          let arr = [];
          this.da.map(v => {
            let obj = {};
            obj.code = v["设备ID"];
            obj.type = v["设备型号"];
            arr.push(obj);
          });
          console.log(arr);
          return arr;
        };
        reader.readAsArrayBuffer(f);
      };

      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    getExcel(res) {
    require.ensure([], () => {
        const { export_json_to_excel } = require('../assets/js/Excel/Export2Excel')
        const tHeader = ['姓名', '年龄']
        const filterVal = ['name', 'age']
        const list = res
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '导出列表名称')
    })
},

formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
},
  }
};
</script>