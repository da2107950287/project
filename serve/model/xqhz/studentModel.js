const dbBase = require('../../config/dbBase.config');

class studentModel extends dbBase {
    constructor() {
        super();
        this.table = '';
    }
    //获取学生信息
    getStudentInfo(cid, callback) {

        this.table = 'student'
        let sql = `select * from ${this.table} where sid = ? `;
        this.mydb.query(sql, [cid], (err, result) => {
            callback(result)
        })
    }
    //修改学生信息
    editStudentInfo(data, callback) {
        this.table = 'student';
        // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
        let string1 = [];
        let string2 = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                let value = key + "=?"
                string1.push(value);
                string2.push(data[key]);
            }
        }
        string2.push(data.sid);
        let sql = `update ${this.table} set ${string1.join(",")} where sid=?`;
        this.mydb.query(sql, string2, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }
        })
    }
    getEntryTrainList(info, callback) {
        this.table = 'entry'
        console.log(999)
        let sql = `select training.*,entry.entry_time from training,entry where sid = ? and training.tid=entry.tid`;
        this.mydb.query(sql, [info.sid], (err, result) => {
            console.log(result)
            // console.log(result[0].entry_time.replace(/T/g,'').replace(/\.[\d]{3}Z,''))
            callback(result)
        })

    }
    getSelfDeliveryList(info, callback) {
        this.table = 'delivery'
        console.log(info.sid)
        let sql = `select  recruitment.rec_position,recruitment.rid,delivery.delivery_time,
        company.rec_name,company.rec_page from company,delivery,recruitment,resume
        where delivery.rid=recruitment.rid and 
        company.cid=recruitment.cid and delivery.sid = ? and resume.sid =?`;
        this.mydb.query(sql, [info.sid,info.sid], (err, result) => {
            console.log(sql)
            if(err){
                console.log(err)
            }else{
                callback(result)
                console.log(result)
            }
        })
    }

    editCoInfo(data, callback) {
        // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
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
    getTrainingList(callback) {
        this.table = 'training'
        let sql = `select * from ${this.table} where 1 `;
        this.mydb.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }

        })
    }
    getTrainScore(data, callback) {
        console.log(data)
        let sql = ` select training.tid,training.class_name,training.class_teacher,score.score,entry.eid from training,score,entry where entry.eid=score.eid and entry.tid=training.tid and score.sid=? and score.status=1 `;
        this.mydb.query(sql, [data.sid], (err, result) => {
            if (err) {
                callback(err)
                console.log(err)
            } else {
                callback(result)
                console.log(result)
            }
        })
    }



    insertSelfResume(info, callback) {
        this.table = 'resume'
        let selectSql = `select * from ${this.table} where sid=? `
        this.mydb.query(selectSql, [info.sid], (err, result) => {
            if (err) {
                callback(err)
            } else {
                if (result.length != 0) {
                    let delSql = `delete from ${this.table}  where sid=?`
                    this.mydb.query(delSql, [info.sid], (err, result) => {
                        if (err) {
                            callback(err)
                        } else {
                            callback(result)
                        }

                    })
                }
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
                    console.log(sql)
                    console.log(data)
                    if (err) {
                        callback(err)
                        console.log(err)
                    } else {
                        callback(result);
                    }

                })


            }

        })

    }
    getSelfResume(info, callback) {
        this.table = 'resume'
        let sql = `select * from ${this.table} where sid=? `;
        this.mydb.query(sql, [info.sid], (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }

        })
    }
    //删除简历
    delSelfResume(info, callback) {
        this.table = 'resume'
        let sql = `delete from ${this.table} where sid=? `;
        this.mydb.query(sql, [info.sid], (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }

        })
    }
}

module.exports = studentModel;