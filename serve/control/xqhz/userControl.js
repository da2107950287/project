const express = require('express');
const router = express.Router();
const userModel = require('../../model/xqhz/userModel');
const JwtUtil = require('../../tool/jwt');
let jwt = new JwtUtil();
let usermodel = new userModel();
//用户登陆
router.post('/login', (req, res) => {
    let data = req.body;
    usermodel.login(data, (result) => {
        if (result.length == 0) {
            res.json({ msg: "用户名不存在！" })
        } else if (result[0].password != data.password) {
            res.json({ msg: "密码错误！" })
        } else {
            let token;
            if (data.radio == 1) {
                result[0].role = 'student'
                token = jwt.createToken({ sid: result[0].sid })
            } else if (data.radio == 2) {
                if (result[0].status == 1) {
                    result[0].role = 'company'
                    token = jwt.createToken({ cid: result[0].cid })
                } else if (result[0].status == 0) {
                    res.json({code:1, msg: '请耐心等待管理员审核' })
                } else {
                    res.json({ msg: '公司审核不通过' })
                }
            } else {
                result[0].role = 'admin'
                token = jwt.createToken({ aid: result[0].aid })
            }
            res.json({ msg: "登录成功！", data: { token: token, role: result[0].role } })
        }


    })
})
//企业注册
router.post('/register', (req, res) => {
    let data = req.body;
    usermodel.register(data, (result) => {
        res.json({ msg: "注册成功" })
    })
})

module.exports = router;