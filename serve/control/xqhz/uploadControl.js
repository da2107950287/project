const JwtUtil = require('../../tool/jwt');
const express = require('express');
let router = express.Router();
var formidable = require('formidable');
const studentModel = require('../../model/xqhz/studentModel');

let studentmodel = new studentModel();

var path = require("path");
var fs = require("fs");
let jwt = new JwtUtil();

router.post("/insertSelfResume", function (req, res) {
    let datas = {};
    datas.code = '0';
    datas.message = '上传图片成功';
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    console.log(__dirname);
    let filedr = "/../../uploads";
    form.uploadDir = path.join(__dirname + filedr);
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    //处理图片
    form.parse(req, function (err, fields, files) {

        jwt.checkToken(fields.token).then(res1 => {
            console.log(res1.sid)

            var filename = files.file.name
            var nameArray = filename.split('.');
            var type = nameArray[nameArray.length - 1];
            var name = '';
            for (var i = 0; i < nameArray.length - 1; i++) {
                name = name + nameArray[i];
            }
            var date = new Date();
            var avatarName = date.getTime() + '.' + type;
            var newPath = form.uploadDir + '/' + avatarName;
            fs.renameSync(files.file.path, newPath); //重命名
            let data1 = {};
            data1.name = avatarName;
            data1.url = "http://localhost:81/uploads/" + avatarName;
            datas.data = data1
            console.log(newPath)
            // router.post('/insertSelfResume', (req, res) => {
                // console.log(req1.sid)
            let data = {};
            data.sid = res1.sid;
            data.url = data1.url
            console.log(data, 9999999)
            studentmodel.insertSelfResume(data, (result) => {
                // res.json({ code: 0, msg: '操作成功' })
                res.send(datas);

            })

            // })

            return;
        }).catch(err => {
            res.json({ err: -1, msg: 'token非法' });
        })
    })


});

module.exports = router;