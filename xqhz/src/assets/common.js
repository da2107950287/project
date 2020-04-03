export function getList(tableData, data, pageIndex, pageSize,pageTotal,keyWord,value) {
        // es6过滤得到满足搜索条件的展示数据list
        console.log(value)
        console.log(keyWord)
        console.log(data)
        console.log(pageIndex)
        console.log()
        let list = data.filter((item, index) =>
        item[value].includes(keyWord)
        );
        console.log(list)
        tableData = list.filter(
          (item, index) =>
            index < pageIndex * pageSize &&
            index >= pageSize * (pageIndex - 1)
        );
        pageTotal = list.length;
      }
