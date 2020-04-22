exports.cors = (req, res, next)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE
        
        ");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.header("Access-Control-Allow-Credentials", true); //设置cookie跨域问题
        // if(strtoupper($_SERVER['REQUEST_METHOD'])== 'OPTIONS'){
        //   exit;
        // }
        next();

    // res.header("Access-Control-Allow-Credentials", true);//session
    // 表示路由继续往下匹配
   
}