const express = require('express');
const router = express.Router();
const studentModel = require('../../model/xqhz/studentModel');
const JwtUtil = require('../../tool/jwt');
let studentmodel = new studentModel();
let jwt = new JwtUtil();

//获取学生个人信息
router.post('/getStudentInfo', (req, res) => {
    console.log("getstudentInfo")
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        studentmodel.getStudentInfo(res1.sid, (result) => {
            res.json({ code: 0, data: result[0] })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    })
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


//获取培训成绩
router.post('/getTrainScore', (req, res) => {
    jwt.checkToken(req.headers.authorization).then(res1 => {
        let data={};
        data.sid=res1.sid
        studentmodel.getTrainScore(data, (result) => {
            res.json({ code: 0, data:result })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    }
    )
})



//获取简历信息
router.post('/getSelfResume',(req,res)=>{
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        let data={};
        data.sid=res1.sid
        console.log(data)
        studentmodel.getSelfResume(data, (result) => {
            res.json({ code: 0, data:result[0] })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    })
})
// delSelfResume
//删除简历
router.post('/delSelfResume',(req,res)=>{
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        let data={};
        data.sid=res1.sid
        studentmodel.delSelfResume(data, (result) => {
            res.json({ code: 0, msg:'操作成功' })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    })
})
router.post('/verifyPassword',(req,res)=>{
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        let data={};
        data.sid=res1.sid;
        studentmodel.verifyPassword(data, (result) => {
            console.log(result[0]);
            res.json({ code: 0,data:result[0], msg:'操作成功' })
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    })
})

router.post('/editPassword',(req,res)=>{
    let data={};
    console.log(res.body)
    data.password=req.body.password;
    jwt.checkToken(req.headers.authorization).then(res1 => {
        //token验证成功
        
        data.sid=res1.sid
        
        studentmodel.editPassword(data, (result) => {
            if(result.affectedRows){
                res.json({ code: 0,msg:'修改密码成功！' })
            }else{
                res.json({code:1,msg:'修改密码失败，请重新操作！'})
            }
        })
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' });
    })
})
module.exports = router;