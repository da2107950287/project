const dbBase=require('../config/dbBase.config');
class userModel extends dbBase{
    constructor(){
        super();
        this.table='user';
        
    }
    Register(userinfo, callback) {
   
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

        let sql = `insert into accompany (${fieldstring.join(",")}) values (${field.join(",")})`;
        // this.test();
        this.connection.query(sql, data, (error, result) => {
            if(err){
                callback(err)
            }else{
                console.log(result)
            callback(result);
            }
            // this.end();
        })
    }

    
}
module.exports=userModel;