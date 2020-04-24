const dbBase = require('../../config/dbBase.config');
class userModel extends dbBase {
    constructor() {
        super();
        this.table = '';
    }
    //登录
    login(loginInfo, callback) {
        this.table = 'admin'
        let sql = `select * from ${this.table} where username = ? `;
        this.mydb.query(sql, [loginInfo.username], (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(result);
            }
        })
    }
    //添加学生列表
    addStudentList(info, callback) {

        this.table = 'student'
        let data = [];
        let fieldstring = [];
        let field = [];
        let arr = [];
        let sql;
        info.forEach((item, index) => {
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    field.push("?");
                    data.push(item[key]);
                    fieldstring.push(key);
                }
               
            }
            arr.push("(" + field + ")");
            field = []
            fieldstring = Array.from(new Set(fieldstring))
            sql = `insert into ${this.table} (${fieldstring.join(",")}) values ${arr.join(",")}`;
        });
        this.mydb.query(sql, data, (err, result) => {
            if (err) {
                console.log(err)
                callback(err)
            } else {               
                callback(result);
            }
        })
    }
    //获取学生列表
    getStudentList(callback) {

        this.table = 'student'
        let sql = `select * from ${this.table} where 1 `;
        this.mydb.query(sql, (err, result) => {
            callback(result)
        })
    }
    //删除学生
    delStudent(data, callback) {
        this.table = 'student';
        let sql = `delete from ${this.table} where sid = ?`;
        this.mydb.query(sql, [data], (err, result) => {
            callback(result)
        })
    }
    delMultStudent(info, callback) {
        this.table = 'student';
        let field=[];
        info.forEach((item, index) => {         
            field.push(item.sid)
        });
       let sql = `delete from ${this.table} where sid in (${field})`;
        this.mydb.query(sql,(err, result) => {
            callback(result)
        })
    }
    //编辑学生信息
    editStudent(data, callback) {
        // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
        this.table = 'student'
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
            callback(result);
        })

    }
    //获取企业列表
    getCompanyList(callback) {
        this.table = 'company'
        let sql = `select * from ${this.table} where 1 `;
        this.mydb.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }
        })
    }
    //获取企业信息
    getCompanyInfo(data, callback) {
        console.log(data)
        this.table = 'company'
        let sql = `select * from ${this.table} where cid=? `;

        this.mydb.query(sql, [data.cid], (err, result) => {
            console.log(sql)
            callback(result)
        })
    }
    //删除企业
    delCompany(data, callback) {
        this.table = 'company';
        let sql = `delete from ${this.table} where cid = ?`;
        this.mydb.query(sql, [data.cid], (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }
        })
    }
    //编辑企业信息
    editCompany(data, callback) {
        // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
        this.table = 'company'
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
    //修改公司审核状态
    modifyApprovalStatus(data, callback) {
        // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
        this.table = 'company'
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
            if (err) {
                console.log(err)
            } else {
                callback(result);
            }
        })

    }
    //获取管理员列表
    getAdminList(callback) {
        this.table = 'admin'
        let sql = `select * from ${this.table} where 1 `;
        this.mydb.query(sql, (err, result) => {
            callback(result)
        })
    }






}
module.exports = userModel;