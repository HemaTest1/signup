const express= require('express')
const sstudentRouter = express.Router();
const sstudentcontroller = require("../Controller/sstudentcontroller");
const multer = require('multer');

sstudentRouter.post('/savestudent', sstudentcontroller.createStudent);
sstudentRouter.post('/savestudent/:student_name', sstudentcontroller.studentname);
sstudentRouter.get('/', sstudentcontroller.getAllStudents);
sstudentRouter.get('/:id', sstudentcontroller.getStudentById);
sstudentRouter.put('/:id', sstudentcontroller.updateStudent);
sstudentRouter.delete('/:id', sstudentcontroller.deleteStudent);
// sstudentRouter.post('/:student_id', sstudentcontroller.createOrUpdateResult);

module.exports = sstudentRouter;