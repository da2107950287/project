const jwt = require("jsonwebtoken");

class Jwt{
 createToken(payload){
    const secret = "aaabbbfadwesooweiiaf";
    payload.rtiem = new Date();
    payload.exp = 60 * 60 * 2 *1000;
    return jwt.sign(payload,secret);
}

 checkToken(token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,secret,(err,res)=>{
            if(!err) {
                resolve(res)
            }else{
                reject("token验证失败");
            }
        })
    })
}
}
module.exports=Jwt;