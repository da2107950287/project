const express = require('express');
const router = express.Router();
const userModel = require('../../model/xqhz/userModel');
const JwtUtil = require('../../tool/jwt');
let usermodel = new userModel();
router.post('/login', (req, res) => {
    let data = req.body;
    usermodel.Login(data, (result) => {

        if (result.length == 0) {
            res.json({ msg: "用户名不存在！" })
        } else if (result[0].password != data.password) {
            res.json({ msg: "密码错误！" })
        } else {
            console.log(result)
            let jwt = new JwtUtil();
            let token;
            if (data.radio == 1) {
                token = jwt.createToken({ uid: result[0].uid })
            } else if (data.radio == 2) {
                if (result[0].status == 1) {
                    token = jwt.createToken({ cid: result[0].cid })
                } else if (result[0].status == 0) {
                    res.json({ msg: '待审核' })
                } else {
                    res.json({ mag: '审核不通过' })
                }
            } else {
                token = jwt.createToken({ aid: result[0].aid })
            }
            res.json({ msg: "登录成功！", data: { token: token, role: result[0].role } })
        }


    })
})
//企业注册
router.post('/register', (req, res) => {
    let data = req.body;
    usermodel.Register(data, (result) => {
        res.json({ msg: "注册成功" })
    })
})

// checkToken(req.headers.Authorization).then(res=>{
//     //token验证成功
//     //判断过期时间
// }).catch(err=>{
//     res.json({{err:-1,msg:'token非法'}})
// }
// router.post('/adminlist', (req, res) => {

//     adminmodel.adminList((result) => {

//         console.log(result)
//         res.json(result)

//     })
// })
module.exports = router;