const dbBase = require('../../config/dbBase.config');

class companyModel extends dbBase {
    constructor() {
        super();
        this.table = 'company';
    }
    getCoInfo(cid, callback) {

        this.table = 'company'
        let sql = `select * from ${this.table} where cid = ? `;
        this.mydb.query(sql, [cid], (err, result) => {
            callback(result)
        })
    }
    editCoInfo(data, callback) {
        // UPDATE 表名称 SET 列名称 = 新值 where 列名称 = 某值
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
    Login(loginInfo, callback) {
        if (loginInfo.radio == 1) {
            this.table = 'student'
        } else if (loginInfo.radio == 2) {
            this.table = 'company'
        } else {
            this.table = 'admin'
        }
        console.log(this.table)
        let sql = `select * from ${this.table} where username = ? `;
        this.mydb.query(sql, [loginInfo.username], (err, result) => {
            if (err) {
                callback(err);
            } else {
                if (loginInfo.radio == 1) {
                    result[0].role = 'student'
                } else if (loginInfo.radio == 2) {
                    result[0].role = 'company'
                } else {
                    result[0].role = 'admin'
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
            console.log(result, "jjjjj")
            callback(result);
            // this.end();
        })
    }
    postTraining(traininginfo, callback) {
        this.table = 'training'
        let data = [];
        let fieldstring = [];
        let field = [];
        for (const key in traininginfo) {
            if (traininginfo.hasOwnProperty(key)) {
                field.push("?");
                data.push(traininginfo[key]);
                fieldstring.push(key);
            }
        }
        let sql = `insert into ${this.table} (${fieldstring.join(",")}) values (${field.join(",")})`;
        // this.test();
        this.mydb.query(sql, data, (err, result) => {
            if (err) {
                console.log(err)
                callback(err)
            } else {
                console.log(sql)
                callback(result);
            }
            // this.end();
        })
    }
    postRecruitment(info, callback) {
        this.table = 'recruitment'
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
        // this.test();
        this.mydb.query(sql, data, (err, result) => {
            if (err) {
                console.log(err)
                callback(err)
            } else {
                console.log(sql)
                callback(result);
            }
            // this.end();
        })
    }
    getTrainingList(callback) {
        this.table = 'training'
        let sql = `select * from ${this.table} where status=1 `;
        this.mydb.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }

        })
    }
    //获取企业招聘头低低记录
    getRecruitmentList(callback) {
        this.table = 'recruitment'
        
        let sql = `select recruitment.*,company.* from recruitment,company where recruitment.status= 1 and recruitment.cid=company.cid   `;
        this.mydb.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }

        })
    }
    getSelfRecruitmentList(data,callback){
        this.table = 'recruitment';
        console.log(data.cid)
        let sql = `select * from ${this.table} where cid= ?`;
        this.mydb.query(sql,[data],(err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }

        })
    }
    getDeliveryRecordList(data,callback){
        let sql = `select (select recruitment.rec_position from recruitment where delivery.rid=recruitment.rid) AS rec_position,delivery.delivery_time,student.username from student,delivery
         where (delivery.sid=student.sid and delivery.rid in (select rid from recruitment where cid = ?))`;
        this.mydb.query(sql,[data],(err, result) => {
            console.log(result)
            console.log(sql)
            if (err) {
                callback(err)
            } else {
                callback(result)
            }

        })
    }
     
}
module.exports = companyModel;