const express = require('express');
const router = express.Router();
const studentModel = require('../../model/xqhz/studentModel');
const JwtUtil = require('../../tool/jwt');
let studentmodel = new studentModel();
let jwt = new JwtUtil();

//获取学生信息
router.post('/getStudentInfo', (req, res) => {
    console.log("getstudentInfo")
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        studentmodel.getStudentInfo(res1.sid, (result) => {
            res.json({ code: 0, data: result[0] })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    }
    )
})
//修改学生信息
router.post('/editStudentInfo', (req, res) => {
    console.log("getstudentInfo")
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        let data=req.body;
        data.sid=res1.sid;
        studentmodel.editStudentInfo(data, (result) => {
            console.log(result)
           if(result.affectedRows){
               res.json({code:0,msg:'修改成功'});
           }
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    }
    )
})
router.post('/getEntryTrainList', (req, res) => {
    console.log("getEntryTrain")
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        let data=req.body;
        data.sid=res1.sid;
        console.log(data,"getEntryTrain")
        studentmodel.getEntryTrainList(data, (result) => {
            res.json({ code: 0, data: result })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    }
    )
})
router.post('/editStudent', (req, res) => {
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        let data = req.body;
        data.cid = res1.cid;
        studentModel.editStudent(data, (result) => {
            res.json({ msg: '编辑成功' })

        })

    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
        console.log(err)
    }
    )
})

router.post('/getSelfDeliveryList', (req, res) => {
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        let data=req.body;
        data.sid=res1.sid;
        studentmodel.getSelfDeliveryList(data, (result) => {
            
            res.json({ code: 0, data: result,msg:'获取数据成功' })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    }
    )
})

module.exports = router;