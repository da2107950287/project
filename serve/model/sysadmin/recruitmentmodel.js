const dbBase=require('../../config/dbBase.config');
class recruitmentModel extends dbBase{   
    constructor(){
        super();
        this.table='recruitment';
    }
    getRecruitmentList(callback){
        let sql =`select recruitment.*,company.rec_name from ${this.table},company where recruitment.cid=company.cid `;
        this.mydb.query(sql,(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(result) 
            }
                
        })
    }
    delRecruitment(data,callback){
        let sql = `delete from ${this.table} where tid = ?`;
        this.mydb.query(sql,[data.tid],(err,result)=>{
            callback(result)
        })
    }
    editRecruitment(data,callback){
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
    getRecruitmentInfo(data,callback){
        this.table='recruitment'
        console.log(data)
        let sql =`select * from ${this.table} where tid=? `;
        
        this.mydb.query(sql,[data.tid],(err,result)=>{
            console.log(sql)
          callback(result)       
        })
    }
    modifyApprovalStatus(data, callback) {
        // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
        this.table = 'recruitment'
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

    delAllRecruitment(data,callback){
            console.log("data",data)
            console.log(data.data.length)

            let sql = `delete from ${this.table} where rid = ?`;
            for(let i=0;i<data.data.length;i++){
              
                let sql = `delete from ${this.table} where rid = ?`;
            }
            this.mydb.query(sql,[data.data[i].rid],(err,result)=>{
                    
                callback(result)
            })
            
        }
}
module.exports=recruitmentModel;