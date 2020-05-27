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
//编辑企业信息
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
//发布培训信息
router.post('/postTraining', (req, res) => {
    console.log('postTraining')
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        let data = req.body;
        data.cid = res1.cid;
        companymodel.postTraining(data, (result) => {
            if(result.affectedRows){
                res.json({code:0, msg: '添加培训信息成功，等待管理员审核' })
               }else{
                res.json({code:1, msg: '添加培训信息失败，请重新操作' })
               }
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
        console.log(err)
    })
})
//发布招聘信息
router.post('/postRecruitment', (req, res) => {
    console.log('postRecruitment')
    jwt.checkToken(req.headers.authorization).then(res1 => {
        let data = req.body;
        data.cid = res1.cid;
        console.log(data)
        companymodel.postRecruitment(data, (result) => {
            if(result.affectedRows){
                res.json({code:0, msg: '添加招聘信息成功，等待管理员审核' })
               }else{
                res.json({code:1, msg: '添加招聘信息失败，请重新操作' })
               }
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
        console.log(err)
    }
    )
})
//获取首页企业培训信息表
router.post('/getTrainingList', (req, res) => {
    companymodel.getTrainingList((result) => {
        console.log(result)
        res.json({ code: 0, data: result, msg: '获取数据成功' })
    })
})
//获取所有企业培训信息表
router.post('/getAllTrainingList', (req, res) => {
    companymodel.getAllTrainingList((result) => {
        console.log(result)
        res.json({ code: 0, data: result, msg: '获取数据成功' })
    })
})
//获取首页企业招聘信息列表
router.post('/getRecruitmentList', (req, res) => {
    companymodel.getRecruitmentList((result) => {
        console.log(result)
        res.json({ code: 0, data: result, msg: '获取数据成功' })
    })
})
//获取所有企业招聘信息列表
router.post('/getAllRecruitmentList', (req, res) => {
    companymodel.getAllRecruitmentList((result) => {
        console.log(result)
        res.json({ code: 0, data: result, msg: '获取数据成功' })
    })
})
//企业自己的招聘信息列表
router.post('/getSelfRecruitmentList', (req, res) => {
    jwt.checkToken(req.headers.authorization).then(res1 => {
        console.log(res1.cid)
        companymodel.getSelfRecruitmentList(res1.cid, (result) => {
            console.log(result)
            res.json({ code: 0, data: result, msg: '获取数据成功' })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    })
})
//获取企业自己的培训信息
router.post('/getSelfTrainingList', (req, res) => {
    jwt.checkToken(req.headers.authorization).then(res1 => {
        let data = {};
        data.cid = res1.cid;
        companymodel.getSelfTrainingList(data, (result) => {
            res.json({ code: 0, data: result, msg: '获取数据成功' })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    })
})
//获取企业自己岗位投递列表
router.post('/getDeliveryRecordList', (req, res) => {
    let data = req.body.rid;
    jwt.checkToken(req.headers.authorization).then(res1 => {
        // data.cid=res1.cid
        companymodel.getDeliveryRecordList(data, (result) => {

            res.json({ code: 0, data: result, msg: '获取数据成功' })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    })
})
router.post('/getApplyRecordList', (req, res) => {
    let data = req.body;
    console.log(data)
    jwt.checkToken(req.headers.authorization).then(res1 => {
        companymodel.getApplyRecordList(data, (result) => {
            console.log(result, 99)
            res.json({ code: 0, data: result, msg: '获取数据成功' })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    })
})
router.post('/delTraining', (req, res) => {
    let data = req.body;
    console.log(data)
    jwt.checkToken(req.headers.authorization).then(res1 => {
        companymodel.delTraining(data, (result) => {
            if(result.affectedRows){
                res.json({ code: 0, msg: '删除成功' })
            }else{
                res.json({ code: 1,msg:'删除失败，请重新操作！' })

            }
            
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    })
})
//获取所有企业列表
router.post('/getCompanyList', (req, res) => {
    companymodel.getCompanyList((result) => {
        console.log(result)
        res.json({ code: 0, data: result, msg: '获取数据成功' })
    })

})
//获取培训信息详情
router.post('/getTrainingInfo', (req, res) => {
    let data = req.body;
    console.log(data.tid)
    companymodel.getTrainingInfo(data, (result) => {
        console.log(result, 999)
        res.json({ code: 0, data: result[0], msg: '获取数据成功' })
    })

})
//获取招聘信息详情
router.post('/getRecruitmentInfo', (req, res) => {
    let data = req.body;
    companymodel.getRecruitmentInfo(data, (result) => {
        res.json({ code: 0, data: result[0], msg: '获取数据成功' })
    })

})
//企业删除招聘信息
router.post('/delRecruitment', (req, res) => {
    let data = req.body;
    companymodel.delRecruitment(data, (result) => {
        if(result.affectedRows){
            res.json({ code: 0,msg: '删除成功' })
        }else{
            res.json({ code: 1,msg:'删除失败，请重新操作！' })

        }
    })

})
router.post('/saveScore', (req, res) => {
    console.log('saveScore')
    console.log(req.body)
    let data = req.body.data;
    companymodel.saveScore(data, (result) => {
        console.log(result)
        if (result.affectedRows) {
            res.json({ code: 0, msg: '操作成功' })
        } else {
            res.json({ code: 1, msg: '操作失败' })
        }
    })

})

module.exports = router;