<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;"
      border
    >
      <el-table-column label="ID" prop="cid" align="center"></el-table-column>
      <el-table-column label="账号" prop="username" align="center"></el-table-column>
      <el-table-column label="密码" prop="password" align="center"></el-table-column>
      <el-table-column label="密码" prop="personal_tel" align="center"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      search: ""
    };
  },
  methods: {
    getAdminList() {
      console.log(this);
      this.$axios
        .post("/sysadmin/company/getCoList")
        .then(res => {
          console.log(res.data);

          this.tableData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  created() {
    this.getAdminList();
  }
};
</script>
<style lang="scss" scoped>

</style>