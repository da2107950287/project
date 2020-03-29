const dbBase=require('../../config/dbBase.config');
class userModel extends dbBase{   
    constructor(){
        super();
        this.table='';
    }
    getStudentList(callback){
        
        this.table='student'
        let sql =`select * from ${this.table} where 1 `;
        this.mydb.query(sql,(err,result)=>{
          callback(result)       
        })
    }
    delStudent(data,callback){
        this.table='student';
        let sql = `delete from ${this.table} where sid = ?`;
        this.mydb.query(sql,[data],(err,result)=>{
            callback(result)
        })
    }
    editStudent(data,callback){
          // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
          this.table='student'
          let string1 = [];
          let string2 = [];
          for (const key in data) {
              if (data.hasOwnProperty(key)) {
                  let value = key + "=?"
                  string1.push(value);
                  string2.push(data[key]);
  
              }
          }
          string2.push(data.sid);
          let sql = `update ${this.table} set ${string1.join(",")} where sid=?`;
          this.mydb.query(sql, string2, function (err, result) {
              callback(result);
          })
  
    }
    getCompanyList(callback){
        this.table='company'
        let sql =`select * from ${this.table} where 1 `;
        this.mydb.query(sql,(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(result)
            }     
        })
    }
    getCompanyInfo(data,callback){
        console.log(data)
        this.table='company'
        let sql =`select * from ${this.table} where cid=? `;
        
        this.mydb.query(sql,[data.cid],(err,result)=>{
            console.log(sql)
          callback(result)       
        })
    }
    delCompany(data,callback){
        this.table='company';
        let sql = `delete from ${this.table} where cid = ?`;
        this.mydb.query(sql,[data.cid],(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(result)
            }
        })
    }
    editCompany(data,callback){
          // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
          this.table='company'
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






    Login(loginInfo,callback){      
        if(loginInfo.radio==1){
            this.table='student'
        }else if(loginInfo.radio==2){
            this.table='user'
        }else{
            this.table='admin'
        }
        console.log(this.table)
        let sql=`select * from ${this.table} where username = ? `;
        this.mydb.query(sql,[loginInfo.username],(err,result)=>{
            if(err){              
                callback(err);
            }else{
                if(loginInfo.radio==1){
                    result[0].role='student'
                }else if(loginInfo.radio==2){
                    result[0].role='user'
                }else{
                    result[0].role='admin'
                }
                console.log(result)
                callback(result);
            }            
        })
    }
    Register(userinfo, callback) {
        console.log(userinfo)
        let data = [];
        let fieldstring = [];
        let field = [];

        for (const key in userinfo) {
            if (userinfo.hasOwnProperty(key)) {
                field.push("?");
                data.push(userinfo[key]);
                fieldstring.push(key);
            }
        }
        let sql = `insert into user (${fieldstring.join(",")}) values (${field.join(",")})`;
        // this.test();
        this.mydb.query(sql, data, (error, result) => {
            console.log(result,"jjjjj")
            callback(result);
            // this.end();
        })
    }  
}
module.exports=userModel;