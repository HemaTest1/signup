const express= require('express')
const subjectRouter = express.Router();
const subjectcontroller = require("../Controller/subjectscontroller");
// const multer = require('multer');
// const upload =multer({dest : 'excel/'});




subjectRouter.post('/savesubject',subjectcontroller.savesubject);
subjectRouter.get('/getsubject',subjectcontroller.getAllsubjects);
subjectRouter.delete('/subjects/:subject_id',subjectcontroller.deleteSubject);
subjectRouter.get('/subjects/:subject_id',subjectcontroller.getsubjectnamebyid);



module.exports = subjectRouter;





