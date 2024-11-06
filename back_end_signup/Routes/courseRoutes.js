const express = require('express')
const courserouter =express.Router();
const coursecontroller = require("../Controller/coursecontroller");


courserouter.post("/insertcourse",coursecontroller.insertcourse);
courserouter.get("/getcourse",coursecontroller.getAllCourses);






module.exports = courserouter