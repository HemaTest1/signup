const express= require('express')
const answerRouter = express.Router();
const answercontroller = require("../Controller/answercontroller");
const multer = require('multer');
const upload =multer({dest : 'excel/'});




answerRouter.post('/ExcelA',upload.single('file'),answercontroller.ExcelA);
answerRouter.get('/correctanswer/:questionId',answercontroller.corectanswer);
answerRouter.get('/check-answer',answercontroller.checkAnswer);
answerRouter.get('/question/:id',answercontroller.getQuestionWithAnswers);
answerRouter.get('/answer/:questionId',answercontroller.getanswer);


module.exports = answerRouter;





