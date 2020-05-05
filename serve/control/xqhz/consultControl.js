const express = require('express');
const router = express.Router();
const consultModel = require('../../model/xqhz/consultModel');
const JwtUtil = require('../../tool/jwt');
let consultmodel = new consultModel();
let jwt = new JwtUtil();
//是否报名参加该培训
router.post('/getConsultList', (req, res) => {
    consultmodel.getConsultList( (result) => {
            res.json({ code: 0, data: result })
        })
   
})
router.post('/postConsult', (req, res) => {
    let data=req.body;
    consultmodel.postConsult(data,(result) => {
        if(result.affectedRows){
            res.json({ code: 0, msg: '发布留言咨询成功' })
        }else{
            res.json({ code: 1, msg: '发布留言咨询失败，请重新操作' })

        }
     

    })

})
router.post('/search', (req, res) => {
    let data=req.body;
    console.log(data.keyword)
    consultmodel.search(data,(result) => {
        res.json({ code: 0, msg: '操作成功',data:result })

    })

})
    module.exports = router;