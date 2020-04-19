const express = require('express');
const app = express();
// const router=express.Router();
const bodyParser = require('body-parser');
// 跨域处理
// var express = require('express');
var multer = require('multer')
const upload = multer({ dest: 'uploads/' });
 
// var app = express();

app.use(require('./tool/cor.js').cors);
// app.use(require('./Self/').cookie);
// app.use(require('./Self/').session);

//用body-parser模块用来解析post的传过来的值
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//使用中间件，启用子路由
// app.use('/user',require('./control/userControl'));
// app.use('/cate',require('./Controller/cateController'));
// app.use('/book',require('./Controller/bookController'));
// app.use('/upload',require('./Controller/uploadController'));
// app.use('/uploads', express.static(__dirname+'/uploads'));
// console.log("sever")
// router.post('/xqhz/upload', function(req, res, next) {
//     console.log(99)
    
//   });
// app.use(upload.single('file')); //
 
// app.post('/api/upload', (req, res)=>{
//   console.log(8888888888888888888)

//   console.log(req.body);//获取到的age和name
//   console.log(req.file);//获取到的文件
    //做些其他事情
// })
app.use('/admin', require('./control/admin/adminControl'));
app.use('/xqhz/user',require('./control/xqhz/userControl'))
app.use('/xqhz/company',require('./control/xqhz/companyControl'));
app.use('/xqhz/student',require('./control/xqhz/studentControl'));
app.use('/xqhz/training',require('./control/xqhz/trainingControl'));
app.use('/xqhz/recruitment',require('./control/xqhz/recruitmentControl'));
app.use('/xqhz/consult',require('./control/xqhz/consultControl'));
// app.use('/xqhz/home',require('./control/xqhz/homeControl'))

app.use('/xqhz/upload',require('./control/xqhz/uploadControl'))
app.use('/uploads', express.static(__dirname+'/uploads'));
//上传个人头像图片

  
app.use('/sysadmin/company',require('./control/sysadmin/companyControl'));
app.use('/sysadmin/user',require('./control/sysadmin/userControl'));
app.use('/sysadmin/training',require('./control/sysadmin/trainingControl'));
app.use('/sysadmin/recruitment',require('./control/sysadmin/recruitmentControl'));

app.use('/sysadmin/consult',require('./control/sysadmin/consultControl'));

// app.use('/',require('./control/admin'))
app.listen(81, () => {
    console.log('正在监听81');
})