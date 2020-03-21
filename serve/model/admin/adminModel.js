const dbBase=require('../../config/dbBase.config');

class adminModel extends dbBase{   
    constructor(){
        super();
        this.table='admin';
    }
    Login(loginInfo,callback){        
        let sql=`select * from ${this.table} where username = ? `;
        this.mydb.query(sql,[loginInfo.username],(err,result)=>{
            if(err){              
                callback(err);
            }else{
                callback(result);
            }            
        })
    }
    adminList(callback){        
        let sql=`select * from ${this.table} where 1 `;
        this.mydb.query(sql,[],(err,result)=>{
            if(err){
              console.log(err)
                callback(err);
            }else{
                console.log(result)
                callback(result);
            }            
        })
    }    
}
module.exports=adminModel;