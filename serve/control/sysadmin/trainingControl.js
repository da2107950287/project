const express = require('express');
const router = express.Router();
const trainingModel = require('../../model/sysadmin/trainingModel');
const JwtUtil = require('../../tool/jwt');
let trainingmodel = new trainingModel();
let jwt = new JwtUtil();

//获取培训信息列表
router.post('/getTrainingList', (req, res) => {
    trainingmodel.getTrainingList((result) => {
       
        res.json({code:0,msg:'获取数据成功',data:result})
    })
})
//删除培训信息
router.post('/delTraining',(req,res)=>{
    let data=req.body;
    trainingmodel.delTraining(data,(result)=>{
       if(result.affectedRows){
           res.json({code:0,msg:'删除成功'})
       }else{
           res.json({code:1,msg:'删除失败，请重新操作！'})
       }

    })
})
//修改学生信息
router.post('/editTraining',(req,res)=>{
    let data=req.body;
    trainingmodel.editTraining(data,(result)=>{
    if(result.affectedRows){
        res.json({code:0,msg:'编辑成功'})
    }else{
        res.json({code:1,msg:'编辑视频，请重新操作！'})
    }
    })
})
router.post('/getTrainingInfo', (req, res) => {
    let data={};
    console.log(req.body)
    data.tid=req.body.tid;
    trainingmodel.getTrainingInfo(data,(result) => {
       res.json({code:0,msg:'获取数据成功',data:result[0]})
    })
})
router.post('/modifyApprovalStatus',(req,res)=>{
    let data=req.body;
    trainingmodel.modifyApprovalStatus(data,(result)=>{
    if(result.affectedRows){
        res.json({code:0,msg:'操作成功'})
        
    }else{
        res.json({code:1,msg:'操作失败，请重新操作！'})
    }
    })
})

module.exports = router;