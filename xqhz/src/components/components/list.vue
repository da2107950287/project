<template>
  <div class="training-entry-list">
    <h3>培训报名记录</h3>
    <hr />
    <div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column label="课程名" align="center">
          <template slot-scope="scope">
            <div @click="getTrainingInfo(scope.row)" class="active">{{scope.row.class_name}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="class_teacher" label="讲师" align="center"></el-table-column>
        <el-table-column prop="class_time" label="培训时间" align="center"></el-table-column>
        <el-table-column prop="class_place" label="培训地址" align="center"></el-table-column>
        <el-table-column prop="entry_time" label="报名时间" align="center"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="pageIndex"
          :page-size="pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    
};
</script>
<style scoped>
</style>