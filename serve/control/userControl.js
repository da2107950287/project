const express=require('express');
const router=express.Router();
const userModel=require('../model/userModel');
let usermodel=new  userModel();
router.post('/register',(req,res)=>{
    console.log(999999999999999)
    let data=req.body;
    console.log("kkk"+data)
    usermodel.Register(data,(result)=>{
        res.json({msg:"注册成功"})
    })
})
module.exports=router;