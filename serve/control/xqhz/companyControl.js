const express = require('express');
const router = express.Router();
const companyModel = require('../../model/xqhz/companyModel');
const JwtUtil = require('../../tool/jwt');
let companymodel = new companyModel();
let jwt = new JwtUtil();
//获取企业信息
router.post('/getCoInfo', (req, res) => {
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        companymodel.getCoInfo(res1.cid, (result) => {
            res.json({ data: result[0] })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    }
    )
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
router.post('/postTraining', (req, res) => {
    console.log('postTraining')
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        let data = req.body;
        data.cid = res1.cid;
        companymodel.postTraining(data, (result) => {
            res.json({ msg: '添加培训信息成功，等待管理员审核' })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
        console.log(err)
    })
})
router.post('/postRecruitment', (req, res) => {
    console.log('postRecruitment')
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        let data = req.body;
        data.cid = res1.cid;
        console.log(data)
        companymodel.postRecruitment(data, (result) => {
            res.json({ msg: '添加招聘信息成功，等待管理员审核' })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
        console.log(err)
    }
    )
})
router.post('/getTrainingList', (req, res) => {
    companymodel.getTrainingList((result) => {
        console.log(result)
        res.json({ code: 0, data: result, msg: '获取数据成功' })
    })
})

router.post('/getRecruitmentList', (req, res) => {

    companymodel.getRecruitmentList((result) => {
        console.log(result)
        res.json({ code: 0, data: result, msg: '获取数据成功' })
    })
})
router.post('/getSelfRecruitmentList', (req, res) => {
    jwt.checkToken(req.headers.authorization).then(res1 => {
        console.log(res1.cid)
        companymodel.getSelfRecruitmentList(res1.cid,(result) => {
            console.log(result)
            res.json({ code: 0, data: result, msg: '获取数据成功' })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    })
})
router.post('/getDeliveryRecordList', (req, res) => {
    jwt.checkToken(req.headers.authorization).then(res1 => {
        console.log(res1.cid)
        companymodel.getDeliveryRecordList(res1.cid,(result) => {
            console.log(result)
            res.json({ code: 0, data: result, msg: '获取数据成功' })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    })
})
// postRecruitment
module.exports = router;