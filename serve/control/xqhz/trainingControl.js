const express = require('express');
const router = express.Router();
const trainingModel = require('../../model/xqhz/trainingModel');
const JwtUtil = require('../../tool/jwt');
let trainingmodel = new trainingModel();
let jwt = new JwtUtil();
//是否报名参加该培训
router.post('/selectIsApply', (req, res) => {
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
            let data = req.body;
            data.sid = res1.sid;
            trainingmodel.selectIsApply(data, (result) => {
                console.log(result)
               if(result[0]){
                    res.json({code:0,msg:'您已报名，请勿重复报名'})
               }else{
                   res.json({code:-1})
               }
            })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    }
    )
})
router.post('/applyTraining', (req, res) => {
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        if (res1.sid) {
            let data = req.body;
            data.sid = res1.sid;
            trainingmodel.applyTraining(data, (result) => {
                res.json({code:0,msg:'报名成功' })
            })
        } else {
            res.json({ code: 1, msg: '对不起，你不能报名' })
        }
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    }
    )
})


module.exports = router;