const express = require('express');
const router = express.Router();
const companyModel = require('../../model/xqhz/companyModel');
const JwtUtil = require('../../tool/jwt');
let companymodel = new companyModel();
let jwt = new JwtUtil();
// router.post('/login', (req, res) => {
//     let data = req.body;
//     companymodel.Login(data, (result) => {
//         if (result.length == 0) {
//             res.json({ msg: "用户名不存在！" })
//         } else if (result[0].password != data.password) {
//             res.json({ msg: "密码错误！" })
//         } else {
//             console.log(result)

            
//             let token;
//             if(data.radio==1){
//                 token = jwt.createToken({ uid: result[0].uid })
//             }else if(data.radio==2){
//                 token = jwt.createToken({ cid: result[0].cid })
//             }else{
//                 token = jwt.createToken({ aid: result[0].aid })
//             }
//             // let token = jwt.createToken({ uid: result[0].uid })
//             res.json({ msg: "登录成功！", data:{token: token,role: result[0].role} })
//         }
//     })
// })
//获取企业信息
router.post('/getCoInfo',(req,res)=>{
    jwt.checkToken(req.headers.authorization).then(res1=>{
        //token验证成功
     
        companymodel.getCoInfo(res1.cid,(result)=>{
           
            res.json({data:result[0]})
        })
     
    }).catch(err=>{
        res.json({err:-1,msg:'token非法'});
    }
    )
})
router.post('/editCoInfo',(req,res)=>{
    
    jwt.checkToken(req.headers.authorization).then(res1=>{
        //token验证成功
        let data=req.body;
        data.cid=res1.cid;
        companymodel.editCoInfo(data,(result)=>{
            res.json({msg:'编辑成功'})
         
        })
     
    }).catch(err=>{
        res.json({err:-1,msg:'token非法'});
        console.log(err)
    }
    )
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