const express = require('express');
const router = express.Router();
const companyModel = require('../../model/sysadmin/companyModel');
const JwtUtil = require('../../tool/jwt');
let companymodel = new companyModel();
let jwt = new JwtUtil();

//获取企业信息
router.post('/getCoList', (req, res) => {
    console.log(88888)
    // jwt.checkToken(req.headers.authorization).then(res1=>{
    //token验证成功

    companymodel.getCoList((result) => {
        console.log(result)
        res.json({ data: result })
    })

    // }).catch(err=>{
    //     res.json({err:-1,msg:'token非法'});
    // }
    // )
})
router.post('/editCoInfo', (req, res) => {

    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        let data = req.body;
        data.cid = res1.cid;
        companymodel.editCoInfo(data, (result) => {
            res.json({ msg: '编辑成功' })

        })

    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
        console.log(err)
    }
    )
})



module.exports = router;