const dbBase=require('../../config/dbBase.config');

class userModel extends dbBase{   
    constructor(){
        super();
        this.table='';
    }
    Login(loginInfo,callback){  
      
        if(loginInfo.radio==1){
            this.table='student'
        }else if(loginInfo.radio==2){
            this.table='company'
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
                    result[0].role='company'
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
        let sql = `insert into company (${fieldstring.join(",")}) values (${field.join(",")})`;
        // this.test();
        this.mydb.query(sql, data, (error, result) => {
            console.log(result,"jjjjj")
            callback(result);
            // this.end();
        })
    }
    // adminList(callback){        
    //     let sql=`select * from ${this.table} where 1 `;
    //     this.mydb.query(sql,[],(err,result)=>{
    //         if(err){
    //           console.log(err)
    //             callback(err);
    //         }else{
    //             console.log(result)
    //             callback(result);
    //         }            
    //     })
    // }    
}
module.exports=userModel;