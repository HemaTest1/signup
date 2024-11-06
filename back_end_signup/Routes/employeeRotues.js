const express = require('express')
const employeerouter = express.Router();
const employeecontroller = require("../Controller/employeecontroller")

employeerouter.post("/insertemployee",employeecontroller.saveEmployee)

module.exports = employeerouter;