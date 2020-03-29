const dbBase=require('../../config/dbBase.config');

class companyModel extends dbBase{   
    constructor(){
        super();
        this.table='training';
    }
    
    applyTraining(info,callback){
        this.table='entry'
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
    selectIsApply(info,callback){
        let sql =`select * from ${this.table} where 1 `;
        this.mydb.query(sql,(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(result) 
            }
                
        })
    }
   
}
module.exports=companyModel;