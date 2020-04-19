const dbBase=require('../../config/dbBase.config');

class consultModel extends dbBase{   
    constructor(){
        super();
        this.table='consult';
    }
    
    postConsult(info,callback){
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
                callback(err)
            }else{
                
                callback(result);
            }
            
        })
    }
    getConsultList(callback){
        let sql =`select * from ${this.table} where status=1`;
        this.mydb.query(sql,(err,result)=>{
          callback(result)       
        })
    }
    search(data,callback){
        data.keyword="%"+data.keyword+"%";
      
        let sql =`select * from ${this.table} where (question like ? or answer like ? ) and status=1 `;
        this.mydb.query(sql,[data.keyword,data.keyword],(err,result)=>{
           
          callback(result)       
        })
    }
 
   
}
module.exports=consultModel;