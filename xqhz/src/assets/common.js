export default{
    getList(tableData, data, pageIndex, pageSize,pageTotal,keyWord,value) {
        // es6过滤得到满足搜索条件的展示数据list
        let list = data.forEach((item, index) =>
        item[value].includes(keyWord)
        );
        tableData = list.filter(
          (item, index) =>
            index < pageIndex * pageSize &&
            index >= pageSize * (pageIndex - 1)
        );
        pageTotal = list.length;
      }
}