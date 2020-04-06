const dbBase = require('../../config/dbBase.config');

class userModel extends dbBase {
    constructor() {
        super();
        this.table = '';
    }
    Login(info, callback) {
        if (info.radio == 1) {
            this.table = 'student'
        } else if (info.radio == 2) {
            this.table = 'company'
        } else {
            this.table = 'admin'
        }
        let sql = `select * from ${this.table} where username = ? `;
        this.mydb.query(sql, [info.username], (err, result) => {
            console.log(sql)
            console.log(info.username)
            if (err) {
                callback(err);
            } else {
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
        this.mydb.query(sql, data, (err, result) => {
            if(err){
                callback(err);
                console.log(err)
            }else{

             
            callback(result);
            }
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
module.exports = userModel;