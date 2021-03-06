const express = require('express');
const router = express.Router();
const consultModel = require('../../model/sysadmin/consultModel');
const JwtUtil = require('../../tool/jwt');
let consultmodel = new consultModel();
let jwt = new JwtUtil();
//获取咨询列表
router.post('/getConsultList', (req, res) => {
    consultmodel.getConsultList((result) => {
       
        res.json({code:0,msg:'获取数据成功',data:result})
    })
})
// //删除学生信息
router.post('/delConsult',(req,res)=>{
    let data=req.body;
    consultmodel.delConsult(data,(result)=>{
       if(result.affectedRows){
           res.json({code:0,msg:'删除成功'})
       }else{
           res.json({code:1,msg:'删除失败，请重新操作！'})
       }

    })
})
//修改学生信息
router.post('/editConsult',(req,res)=>{
    let data={};
    console.log(req.body)
    data.cid=req.body.cid;
    data.answer=req.body.answer;
    data.status=1;
    consultmodel.editConsult(data,(result)=>{
        console.log(result)
        if(result.affectedRows){
            res.json({ code: 0, msg: '回复留言咨询成功' })
        }else{
            res.json({ code: 1, msg: '回复留言咨询失败，请重新操作' })

        }
    })
})



module.exports = router;