const express = require('express');
const router = express.Router();
const userModel = require('../../model/sysadmin/userModel');
const JwtUtil = require('../../tool/jwt');
let usermodel = new userModel();
let jwt = new JwtUtil();

//获取学生列表
router.post('/getStudentList', (req, res) => {
    usermodel.getStudentList((result) => {
        res.json(result)
    })
})
//删除学生信息
router.post('/delStudent',(req,res)=>{
    let data=req.body.sid;
    usermodel.delStudent(data,(result)=>{
       if(result.affectedRows){
           res.json({code:0,msg:'删除成功'})
       }else{
           res.json({code:1,msg:'删除失败，请重新操作！'})
       }

    })
})
//修改学生信息
router.post('/editStudent',(req,res)=>{
    let data=req.body;
    usermodel.editStudent(data,(result)=>{
    if(result.affectedRows){
        res.json({code:0,msg:'编辑成功'})
    }else{
        res.json({code:1,msg:'编辑视频，请重新操作！'})
    }
    })
})
//获取公司列表
router.post('/getCompanyList', (req, res) => {
    usermodel.getCompanyList((result) => {
        res.json(result)
    })
})
//获取公司信息
router.post('/getCompanyInfo', (req, res) => {
    let data=req.body;
    usermodel.getCompanyInfo(data,(result) => {
        console.log(result[0])
        res.json(result[0])
    })
})
//删除公司信息
router.post('/delCompany',(req,res)=>{
    console.log(req.query)
    usermodel.delCompany(req.body,(result)=>{
        console.log(result)
       if(result.affectedRows){
           res.json({code:0,msg:'删除成功'})
       }else{
           res.json({code:1,msg:'删除失败，请重新操作！'})
       }

    })
})
//修改公司信息
router.post('/editCompany',(req,res)=>{
    let data=req.body;
    usermodel.editCompany(data,(result)=>{
    if(result.affectedRows){
        res.json({code:0,msg:'编辑成功'})
    }else{
        res.json({code:1,msg:'编辑视频，请重新操作！'})
    }
    })
})


module.exports = router;