const dbBase=require('../../config/dbBase.config');
class trainingModel extends dbBase{   
    constructor(){
        super();
        this.table='training';
    }
    getTrainingList(callback){
        let sql =`select * from ${this.table} where 1 `;
        this.mydb.query(sql,(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(result) 
            }
                
        })
    }
    delTraining(data,callback){
        let sql = `delete from ${this.table} where tid = ?`;
        this.mydb.query(sql,[data.tid],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    }
    editTraining(data,callback){
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
          string2.push(data.tid);
          let sql = `update ${this.table} set ${string1.join(",")} where tid=?`;
          this.mydb.query(sql, string2, function (err, result) {
              callback(result);
          })
  
    }
    getTrainingInfo(data,callback){
        this.table='training'
        console.log(data)
        let sql =`select * from ${this.table} where tid=? `;
        
        this.mydb.query(sql,[data.tid],(err,result)=>{
            console.log(sql)
          callback(result)       
        })
    }
    modifyApprovalStatus(data, callback) {
        // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
        this.table = 'training'
        let string1 = [];
        let string2 = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                let value = key + "=?"
                string1.push(value);
                string2.push(data[key]);

            }
        }
        string2.push(data.tid);
        let sql = `update ${this.table} set ${string1.join(",")} where tid=?`;
        this.mydb.query(sql, string2, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                callback(result);
            }
        })

    }


}
module.exports=trainingModel;