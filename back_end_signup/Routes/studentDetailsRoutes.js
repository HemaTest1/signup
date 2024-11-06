const express = require('express')
const studentDetailsrouter = express.Router();
const studentdetailscontroller = require("../Controller/studentDetailsController")

studentDetailsrouter.post("/addstudentdetails",studentdetailscontroller.addstudentDetails)
studentDetailsrouter.get("/getstudentdetails",studentdetailscontroller.getstudentdetails)
studentDetailsrouter.post("/referbyemail",studentdetailscontroller.referbyemail)
studentDetailsrouter.post("/getStudentDetailsById",studentdetailscontroller.getStudentDetailsById)



module.exports = studentDetailsrouter