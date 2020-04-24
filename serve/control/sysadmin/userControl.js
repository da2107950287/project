const express = require('express');
const router = express.Router();
const userModel = require('../../model/sysadmin/userModel');
const JwtUtil = require('../../tool/jwt');
let usermodel = new userModel();
let jwt = new JwtUtil();
router.post('/login', (req, res) => {
    let data = req.body;
    usermodel.login(data, (result) => {
        if (result.length == 0) {
            res.json({ msg: "用户名不存在！" })
        } else if (result[0].password != data.password) {
            res.json({ msg: "密码错误！" })
        } else {
            let token = jwt.createToken({ aid: result[0].aid })
            res.json({ code: 0, msg: "登录成功！", token: token, username: data.username })
        }
    })
})
//批量添加学生里列表
router.post('/addStudentList', (req, res) => {
    console.log('addStudentList')
    let data=req.body.data;
    usermodel.addStudentList(data, (result) => {
        if(result.affectedRows){
            res.json({code:0,msg: '导入学生列表成功' })
        }else{
            res.json({code:1,msg:'导入学生列表失败'})
        }
    })

})
//获取学生列表
router.post('/getStudentList', (req, res) => {
    usermodel.getStudentList((result) => {
        res.json(result)
    })
})
//删除学生信息
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
            res.json({ code: 0, msg: '编辑成功' })
        } else {
            res.json({ code: 1, msg: '编辑视频，请重新操作！' })
        }
    })
})
//获取公司列表
router.post('/getCompanyList', (req, res) => {
    usermodel.getCompanyList((result) => {
        res.json(result)
    })
})
//获取公司信息
router.post('/getCompanyInfo', (req, res) => {
    let data = req.body;
    usermodel.getCompanyInfo(data, (result) => {
        console.log(result[0])
        res.json(result[0])
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