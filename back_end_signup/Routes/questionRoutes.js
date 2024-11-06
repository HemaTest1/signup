const express= require('express')
const questionrouter = express.Router();
const questioncontroller = require("../Controller/questioncontroller");
const multer = require('multer');
const upload =multer({dest : 'excel/'})


questionrouter.post('/insertquestions',upload.single('file'),questioncontroller.insertquestions);
questionrouter.post('/insertquestion',questioncontroller.insertquestion);
questionrouter.post('/ExcelQ',upload.single('file'),questioncontroller.ExcelQ);



module.exports = questionrouter;





