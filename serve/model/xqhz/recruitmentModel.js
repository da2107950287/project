const dbBase=require('../../config/dbBase.config');

class recruitmentModel extends dbBase{   
    constructor(){
        super();
        this.table='';
    }
    
    delivery(info,callback){
        this.table='delivery'
        let data = [];
        let fieldstring = [];
        let field = [];
        for (const key in info) {
            if (info.hasOwnProperty(key)) {
                field.push("?");
                data.push(info[key]);
                fieldstring.push(key);
            }
        }
        let sql = `insert into ${this.table} (${fieldstring.join(",")}) values (${field.join(",")})`;
        this.mydb.query(sql, data, (err, result) => {
         
            if(err){
                console.log(err)
                callback(err)
            }else{
                console.log(sql)
                
                callback(result);
            }
            
        })
    }
    selectIsDelivery(info,callback){
        this.table='delivery'
        let sql =`select * from ${this.table} where sid=? and rid=?  `;
        this.mydb.query(sql,[info.sid,info.rid],(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(result) 
            }
                
        })
    }
   
}
module.exports=recruitmentModel;