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
        this.mydb.query(sql, data, (err, result) => {
            if (err) {
            console.log(err)

                callback(err)
            } else {
                callback(result);
            }
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
        this.mydb.query(sql, data, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result);
            }
        })
    }
    getTrainingList(callback) {
        this.table = 'training'
        let sql = `select * from ${this.table} where status = 1 limit 10`;
        this.mydb.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }

        })
    }
    getAllTrainingList(callback) {
        this.table = 'training'
        let sql = `select * from ${this.table} where status = 1 `;
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
        let sql = `select recruitment.*,company.* from recruitment,company where recruitment.status= 1 and recruitment.cid=company.cid limit 10`;
        this.mydb.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }

        })
    }
    getAllRecruitmentList(callback) {
        this.table = 'recruitment'
        let sql = `select recruitment.*,company.* from recruitment,company where recruitment.status= 1 and recruitment.cid=company.cid `;
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
    getSelfTrainingList(data,callback){
        this.table = 'training';
        console.log(data.cid)
        let sql = `select * from ${this.table} where cid= ?`;
        this.mydb.query(sql,[data.cid],(err, result) => {
            if (err) {
                callback(err)
            } else {
                console.log(result)
                callback(result)
            }

        })
    }
    getDeliveryRecordList(data,callback){
        let sql = `SELECT delivery.*,student.*,resume.* FROM recruitment,student,delivery,resume 
        WHERE delivery.sid=resume.sid and student.sid=delivery.sid and recruitment.rid=delivery.rid AND delivery.rid=?`;
        this.mydb.query(sql,[data],(err, result) => {
            console.log(result)
            console.log(sql)
            if (err) {
                console
                callback(err)
            } else {
                callback(result)
            }

        })
    }
    getApplyRecordList(data,callback){
        let sql = `select entry.*,student.*, score.score as score from student,entry,score where student.sid=entry.sid and entry.sid=score.sid and entry.eid=score.eid and entry.tid=? union
        select entry.*,student.*,'' as score from student,entry,score where student.sid=entry.sid and entry.tid=? and  entry.eid not in 
        (select score.eid from score)`
         this.mydb.query(sql,[data.tid,data.tid],(err, result) => {
            console.log(result)
            console.log(sql)
            if (err) {
                callback(err)
            } else {
                callback(result)
            }
        })
    }
    getCompanyList(callback) {
        this.table = 'company'
        let sql = `select * from ${this.table} where 1 limit 12 `;
        this.mydb.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }

        })
    }
    getTrainingInfo(data,callback) {
        this.table = 'training';
        console.log(data)
        let sql = `select * from ${this.table} where tid=?`;
        this.mydb.query(sql,[data.tid],(err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }

        })
    }
    
    getRecruitmentInfo(data,callback) {
        let sql = `select recruitment.*,company.* from recruitment,company where recruitment.rid = ? and recruitment.cid=company.cid`;
        this.mydb.query(sql,[data.rid],(err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }

        })
    }
    delRecruitment(data,callback) {
        this.table='recruitment'
        let sql = `delete from ${this.table} where rid = ?`;
        this.mydb.query(sql, [data.rid], (err, result) => {
            if(err){
                console.log(err)
            }
            callback(result);
        })
    }
    delTraining(data,callback) {
        this.table='training';
        let sql = `delete from ${this.table} where tid = ?`;
        this.mydb.query(sql,[data.tid], (err, result) => {
            if(err){
                console.log(err)
            }
            callback(result);
        })
    }
    // saveScore(info, callback) {
    //     // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
    //     console.log(info)
    //     this.table = 'score'
    //     let data = [];
    //     let fieldstring = [];
    //     let field = [];
    //     let arr = [];
    //     let sql;
    //     info.forEach((item, index) => {
    //         for (const key in item) {
    //             if (item.hasOwnProperty(key)) {
    //                 field.push("?");
    //                 data.push(item[key]);
    //                 fieldstring.push(key);
    //             }
    //         }
    //         arr.push("(" + field + ")");
    //         field = []
    //         fieldstring = Array.from(new Set(fieldstring))
    //         sql = `insert into ${this.table} (${fieldstring.join(",")}) values ${arr.join(",")}`;
    //     });
    //     this.mydb.query(sql, data, (err, result) => {
    //         if (err) {
    //             console.log(err)
    //             callback(err)
    //         } else {               
    //             callback(result);
    //         }
    //     })
       

        

    // }
    saveScore(info, callback) {
        this.table = 'score'
        let data = [];
        let fieldstring = [];
        let field = [];
        let arr=[]
        let str=''
        info.forEach((item,index) => {
            console.log(item)
             field=[];
            for (const key in item) {
                
                if (item.hasOwnProperty(key)) {
                    field.push("?");
                    data.push(item[key]);
                    fieldstring.push(key)
                    arr.push(`${key}=?`)
                }
                
                
            }
            console.log("ppp",field)
            str  =str +'('+field.join(',')+'),';
            
            console.log(str)
            fieldstring= Array.from(new Set(fieldstring))
        });
       str =str.substr(0,str.length - 1);  
        console.log("kkk",field)
       let sql = `INSERT INTO ${this.table} (${fieldstring.join(",")}) values ${str} ON DUPLICATE KEY UPDATE eid=values(eid),sid=values(sid),score=values(score)`;
        this.mydb.query(sql, data.concat(data), function (err, result) {
            if(err){
                
                console.log(err)
            }else{
                callback(result);
            }
            
        })
    }
}
module.exports = companyModel;