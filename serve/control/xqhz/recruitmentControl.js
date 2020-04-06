const express = require('express');
const router = express.Router();
const recruitmentModel = require('../../model/xqhz/recruitmentModel');
const JwtUtil = require('../../tool/jwt');
let recruitmentmodel = new recruitmentModel();
let jwt = new JwtUtil();
//是否报名参加该培训

router.post('/delivery', (req, res) => {
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        if (res1.sid) {
            console.log(new Date().getTime())
            let data = req.body;
            data.sid = res1.sid;
            // data.delivery_time = new Date().getTime();
            console.log(data)
            recruitmentmodel.delivery(data, (result) => {
                res.json({ code: 0, msg: '投递成功' })
            })
        } else {
            res.json({ code: 1, msg: '对不起，你不能报名' })
        }
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    }
    )
})
//是否投递简历
router.post('/selectIsDelivery', (req, res) => {
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        let data = req.body;
        data.sid = res1.sid;
        recruitmentmodel.selectIsDelivery(data, (result) => {
            if (result[0]) {
                res.json({ code: 0, msg: '您已投递，请勿重复投递' })
            } else {
                res.json({ code: -1 })
            }
        })
    }).catch(err => {
        console.log(err)
        res.json({ err: -1, msg: 'token非法' });
    }
    )
})


module.exports = router;