const express = require('express')
const studentrouter =express.Router();
const studentcontroller = require("../Controller/studentcontroller");
const multer = require('multer');
const upload =multer({dest : 'images/'})
// const uploadExcel =multer({dest : 'excelFolder/'})


studentrouter.post("/insertstudent",studentcontroller.insertstudent);
studentrouter.get("/getstd",studentcontroller.getStd);
studentrouter.post("/getStudentByEmail", studentcontroller.getStudentByEmail);
studentrouter.post("/getStudentByEmaill", studentcontroller.getStudentByEmaill);
studentrouter.get("/getid/:id",studentcontroller.getid);
studentrouter.post("/referbyemail", studentcontroller.referbyemail);
studentrouter.post("/checkemailandphone", studentcontroller.checkemailandphone);
studentrouter.get("/getallstudent",studentcontroller.getAllStudents);
studentrouter.get("/findStudentById/:id",studentcontroller.findStudentById);
studentrouter.get("/findStudentByid/:id",studentcontroller.findStudentByid);
// studentrouter.get("/findStudentByIdDetails/:id",studentcontroller.findStudentByIdDetails);
studentrouter.get("/getStudentImage/:id",studentcontroller.getStudentImage);
studentrouter.get("/GettingallProfiles",studentcontroller.GettingallProfiles);
studentrouter.post("/upload", upload.single('image'), studentcontroller.uploadimage);
// studentrouter.post("/insertquestions", uploadExcel.single('file'), studentcontroller.insertquestions);



module.exports = studentrouter