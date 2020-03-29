const express = require('express');
const router = express.Router();
const trainingModel = require('../../model/sysadmin/trainingModel');
const JwtUtil = require('../../tool/jwt');
let trainingmodel = new trainingModel();
let jwt = new JwtUtil();

//获取培训信息列表
router.post('/getTrainingList', (req, res) => {
    trainingmodel.getTrainingList((result) => {
        console.log(result)
        res.json(result)
    })
})
//删除学生信息
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



module.exports = router;