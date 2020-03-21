const dbBase=require('../config/dbBase.config');
class userModel extends dbBase{
    constructor(){
        super();
        this.table='user';
        
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

        let sql = `insert into accompany (${fieldstring.join(",")}) values (${field.join(",")})`;
        // this.test();
        this.connection.query(sql, data, (error, results) => {
            callback(results);
            // this.end();
        })
    }

    
}
module.exports=userModel;