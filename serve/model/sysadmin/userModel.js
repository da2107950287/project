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
    //批量添加学生信息
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
                console.log(result)
                callback(result);
            }
        })
    }
    //获取学生列表
    getStudentList(callback) {
        this.table = 'student'
        let sql = `select * from ${this.table} where 1 `;
        this.mydb.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }
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
    //批量删除学生
    delMultStudent(info, callback) {
        this.table = 'student';
        let field = [];
        info.forEach((item, index) => {
            field.push(item.sid)
        });
        let sql = `delete from ${this.table} where sid in (${field})`;
        this.mydb.query(sql, (err, result) => {
            callback(result)
        })
    }
    //编辑学生信息
    editStudent(data, callback) {
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
            if(err){
                console.log(err)
            }else{
                console.log(result)
                callback(result);
            }
        })
    }
    //添加学生信息
    addStudent(info, callback) {
        this.table = 'student'
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
       data.push(info['username'])
       let sql = `insert into ${this.table} (${fieldstring.join(",")}) select${field.join(",")} from dual 
       where not exists(select username from ${this.table} where username=?)`;
        this.mydb.query(sql, data, function (err, result) {
            if(err){
                console.log(err)
            }else{
                console.log(result)
            }
            callback(result);

        })
    }
    // 添加管理员
    addAdmin(info, callback) {
        this.table = 'admin'
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
       data.push(info['username'])
        // console.log(info[])
       let sql = `insert into ${this.table} (${fieldstring.join(",")}) select${field.join(",")} from dual 
       where not exists(select username from ${this.table} where username=?)`;
        this.mydb.query(sql, data, function (err, result) {
            if(err){
                console.log(err)
            }else{
                console.log(result)
            }
            callback(result);
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
    editAdmin(data,callback) {
     
        this.table = 'admin'
        let string1 = [];
        let string2 = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                let value = key + "=?"
                string1.push(value);
                string2.push(data[key]);
            }
        }
        string2.push(data.aid);
        let sql = `update ${this.table} set ${string1.join(",")} where aid=?`;
        this.mydb.query(sql, string2, function (err, result) {
            if(err){
                console.log(err)
            }else{
                console.log(result)
                callback(result);
            }
        })
    }
     //删除管理员
     delAdmin(data, callback) {
        this.table = 'admin';
        let sql = `delete from ${this.table} where aid = ?`;
        this.mydb.query(sql, [data], (err, result) => {
           if(err){
               console.log(err)
           }else(
            callback(result)
           )
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
            if(err){
                console.log(err)
            }else{
                callback(result);

            }
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
    






}
module.exports = userModel;