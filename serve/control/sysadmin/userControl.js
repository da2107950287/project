const express = require('express');
const router = express.Router();
const userModel = require('../../model/sysadmin/userModel');
const JwtUtil = require('../../tool/jwt');
let usermodel = new userModel();
let jwt = new JwtUtil();
// router.post('/login', (req, res) => {
//     let data = req.body;
//     usermodel.login(data, (result) => {
//         if (result.length == 0) {
//             res.json({ msg: "用户名不存在！" })
//         } else if (result[0].password != data.password) {
//             res.json({ msg: "密码错误！" })
//         } else {
//             let token = jwt.createToken({ aid: result[0].aid })
//             res.json({ code: 0, msg: "登录成功！", token: token, username: data.username })
//         }
//     })
// })
//批量添加学生信息
router.post('/addStudentList', (req, res) => {
    let data=req.body.data;
    usermodel.addStudentList(data, (result) => {
      
        if(result.affectedRows){
            res.json({code:0,msg: '导入学生信息成功！' })
        }else{
            res.json({code:1,msg:'导入失败，请重新操作'})
        }
    })
})
//获取学生信息列表
router.post('/getStudentList', (req, res) => {
    usermodel.getStudentList((result) => {
        res.json({code:0,msg:'已获取数据',data:result});
    })
})
//删除一条学生信息
router.post('/delStudent', (req, res) => {
    let data = req.body.sid;
    usermodel.delStudent(data, (result) => {
        if (result.affectedRows) {
            res.json({ code: 0, msg: '删除成功' })
        } else {
            res.json({ code: 1, msg: '删除失败，请重新操作！' })
        }
    })
})
//批量删除学生信息
router.post('/delMultStudent', (req, res) => {
    let data = req.body.data;
    usermodel.delMultStudent(data, (result) => {
        if (result.affectedRows) {
            res.json({ code: 0, msg: '删除成功' })
        } else {
            res.json({ code: 1, msg: '删除失败，请重新操作！' })
        }

    })
})
//修改学生信息
router.post('/editStudent', (req, res) => {
    let data = req.body;
    usermodel.editStudent(data, (result) => {
        if (result.affectedRows) {
            res.json({ code: 0, msg: '操作成功' })
        } else {
            res.json({ code: 1, msg: '操作失败，请重新操作' })
        }
    })
})
router.post('/addStudent', (req, res) => {
    let data = req.body;
    usermodel.addStudent(data, (result) => {
        if (result.affectedRows) {
            res.json({ code: 0, msg: '添加成功' })
        } else {
            res.json({ code: 1, msg: '添加失败，请重新操作' })
        }
    })
})
router.post('/addAdmin', (req, res) => {
    let data = req.body;
    usermodel.addAdmin(data, (result) => {
        if (result.affectedRows) {
            res.json({ code: 0, msg: '添加成功' })
        } else {
            res.json({ code: 1, msg: '添加失败，请重新操作' })
        }
    })
})
router.post('/editAdmin', (req, res) => {
    let data = req.body;
    usermodel.editAdmin(data, (result) => {
        if (result.affectedRows) {
            res.json({ code: 0, msg: '编辑成功' })
        } else {
            res.json({ code: 1, msg: '编辑失败，请重新操作！' })
        }
    })
})
router.post('/delAdmin', (req, res) => {
    let data = req.body.aid;
    usermodel.delAdmin(data, (result) => {
        if (result.affectedRows) {
            res.json({ code: 0, msg: '删除成功' })
        } else {
            res.json({ code: 1, msg: '删除失败，请重新操作！' })
        }
    })
})
//获取公司列表
router.post('/getCompanyList', (req, res) => {
    usermodel.getCompanyList((result) => {
        res.json({code:0,msg:'获取数据成功',data:result})
    })
})
//获取公司信息
router.post('/getCompanyInfo', (req, res) => {
    let data = req.body;
    usermodel.getCompanyInfo(data, (result) => {
       console.log(result)
        res.json({code:0,msg:'获取数据成功',data:result[0]})
    })
})
//删除公司信息
router.post('/delCompany', (req, res) => {
    console.log(req.query)
    usermodel.delCompany(req.body, (result) => {
        console.log(result)
        if (result.affectedRows) {
            res.json({ code: 0, msg: '删除成功' })
        } else {
            res.json({ code: 1, msg: '删除失败，请重新操作！' })
        }

    })
})
//修改公司信息
router.post('/editCompany', (req, res) => {
    let data = req.body;
    usermodel.editCompany(data, (result) => {
        if (result.affectedRows) {
            res.json({ code: 0, msg: '编辑成功' })
        } else {
            res.json({ code: 1, msg: '编辑视频，请重新操作！' })
        }
    })
})

router.post('/modifyApprovalStatus', (req, res) => {
    let data = req.body;
    console.log(data.cid)
    usermodel.modifyApprovalStatus(data, (result) => {
        if (result.affectedRows) {
            res.json({ code: 0, msg: '编辑成功' })

        } else {
            res.json({ code: 1, msg: '编辑视频，请重新操作！' })
        }
    })
})

//获取管理员列表
router.post('/getAdminList', (req, res) => {
    usermodel.getAdminList((result) => {
        res.json({ data: result })
    })
})
module.exports = router;