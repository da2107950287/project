const dbBase=require('../../config/dbBase.config');
class consultModel extends dbBase{   
    constructor(){
        super();
        this.table='consult';
    }
    getConsultList(callback){
        let sql =`select * from ${this.table} where 1  order by cid desc`;
        this.mydb.query(sql,(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(result) 
            }
                
        })
    }
    delConsult(data,callback){
        let sql = `delete from ${this.table} where tid = ?`;
        this.mydb.query(sql,[data.tid],(err,result)=>{
            callback(result)
        })
    }
    editConsult(data,callback){
          // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值

          let string1 = [];
          let string2 = [];
          for (const key in data) {
              if (data.hasOwnProperty(key)) {
                  let value = key + "=?"
                  string1.push(value);
                  string2.push(data[key]);
  
              }
          }
          string2.push(data.cid);
          let sql = `update ${this.table} set ${string1.join(",")} where cid=?`;
          this.mydb.query(sql, string2, function (err, result) {
              callback(result);
          })
  
    }

}
module.exports=consultModel;