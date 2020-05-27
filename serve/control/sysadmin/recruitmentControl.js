const express = require('express');
const router = express.Router();
const recruitmentModel = require('../../model/sysadmin/recruitmentModel');
const JwtUtil = require('../../tool/jwt');
let recruitmentmodel = new recruitmentModel();
let jwt = new JwtUtil();

//获取培训信息列表
router.post('/getRecruitmentList', (req, res) => {
    recruitmentmodel.getRecruitmentList((result) => {
       res.json({code:0,msg:'获取数据成功',data:result})
    
    })
})
//删除招聘信息
router.post('/delRecruitment',(req,res)=>{
    let data=req.body;
    recruitmentmodel.delRecruitment(data,(result)=>{
       if(result.affectedRows){
           res.json({code:0,msg:'删除成功'})
       }else{
           res.json({code:1,msg:'删除失败，请重新操作！'})
       }

    })
})
//修改培训信息
router.post('/editRecruitment',(req,res)=>{
    let data=req.body;
    recruitmentmodel.editRecruitment(data,(result)=>{
    if(result.affectedRows){
        res.json({code:0,msg:'编辑成功'})
    }else{
        res.json({code:1,msg:'编辑视频，请重新操作！'})
    }
    })
})
router.post('/getRecruitmentInfo', (req, res) => {
    let data={};
    console.log(req.body)
    data.tid=req.body.rid;
    recruitmentmodel.getRecruitmentInfo(data,(result) => {
     
        res.json({code:0,msg:'获取数据成功',data:result[0]})
    })
})
router.post('/modifyStatus',(req,res)=>{
    let data=req.body;
    recruitmentmodel.modifyStatus(data,(result)=>{
    if(result.affectedRows){
        res.json({code:0,msg:'操作成功'})
        
    }else{
        res.json({code:1,msg:'操作失败，请重新操作！'})
    }
    })
})

//批量删除
router.post('/delAllRecruitment',(req,res)=>{
    let data=req.body;
    recruitmentmodel.delAllRecruitment(data,(result)=>{
    //    if(result.affectedRows){
    //        res.json({code:0,msg:'删除成功'})
    //    }else{
    //        res.json({code:1,msg:'删除失败，请重新操作！'})
    //    }

    })
})
module.exports = router;