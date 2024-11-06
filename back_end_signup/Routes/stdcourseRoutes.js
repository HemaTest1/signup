const express= require('express')
const stdcourserouter = express.Router();
const stdcoursecontroller = require("../Controller/stdcoursecontroller")

stdcourserouter.post("/savestdcourse", stdcoursecontroller.insertstdcourse);
stdcourserouter.get("/getStudentsByCourse/:id", stdcoursecontroller.getStudentsByCourse);
stdcourserouter.get("/getCourseByStudent/:id",stdcoursecontroller.getCourseByStudent);


module.exports = stdcourserouter; 

  
