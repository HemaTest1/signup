const express= require('express')
const optionRouter = express.Router();
const optioncontroller = require("../Controller/optioncontroller");
const multer = require('multer');
const upload =multer({dest : 'excel/'});




optionRouter.post('/ExcelO',upload.single('file'),optioncontroller.ExcelO);
optionRouter.get('/options/:qid',optioncontroller.getoptionsbyquestion);


module.exports = optionRouter;





