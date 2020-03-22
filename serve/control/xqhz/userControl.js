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
            if(data.radio==1){
                token = jwt.createToken({ uid: result[0].uid })
            }else if(data.radio==2){
                token = jwt.createToken({ cid: result[0].cid })
            }else{
                token = jwt.createToken({ aid: result[0].aid })
            }
            // let token = jwt.createToken({ uid: result[0].uid })
            res.json({ msg: "登录成功！", data:{token: token,role: result[0].role} })
        }
    })
})
//企业注册
router.post('/register',(req,res)=>{
    console.log(999999999999999)
    let data=req.body;
    // console.log(req)
    console.log("kkk"+data)
    usermodel.Register(data,(result)=>{
        res.json({msg:"注册成功"})
    })
})
// router.post('/adminlist', (req, res) => {

//     adminmodel.adminList((result) => {

//         console.log(result)
//         res.json(result)

//     })
// })
module.exports = router;