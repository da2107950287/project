const express = require('express');
const router = express.Router();
const adminModel = require('../../model/admin/adminModel');
const JwtUtil = require('../../tool/jwt');
let adminmodel = new adminModel();
router.post('/login', (req, res) => {
    let data = req.body;
    adminmodel.Login(data, (result) => {
        if (result.length == 0) {
            res.json({ msg: "用户名不存在！" })
        } else if (result[0].password != data.password) {
            res.json({ msg: "密码错误！" })
        } else {
            console.log(result)

            let jwt = new JwtUtil();
            let token = jwt.createToken({ aid: result[0].aid })
            res.json({ msg: "登录成功！", token: token })
        }
    })
})
router.post('/adminlist', (req, res) => {

    adminmodel.adminList((result) => {

        console.log(result)
        res.json(result)

    })
})
module.exports = router;