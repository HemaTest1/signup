const { Model, where } = require('sequelize');
const db = require('../models');
const studentDetails = require('../models/studentDetails');

// Add Student Details only if the email doesn't exist
const addstudentDetails = async (req, res) => {
    try {
        const { name, email, age, phone ,password} = req.body;
    
        // Check if a student with the same email already exists
        const existingStudent = await db.studentDetails.findOne({ where: { email } });
    
        if (existingStudent) {
          // If the email exists, return a 401 status with a message
          return res.status(400).send({ message: "Account already exists" });
        }
    
        // If the email does not exist, create a new student
        const studentdetails = await db.studentDetails.create({ name, email, age, phone,password });
        res.status(200).send({ message: "Saved successfully", studentdetails });
      } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send({ message: error.message });
      }
 }

 const getstudentdetails = async (req, res) => {
    try {

        const {name,email,age,phone,password} = req.body;
        console.log("name",name)
        const findingdetatils = await db.studentDetails.findAll({
            name,
            email : email,
            age : age,
            phone :phone,
            password: password

        });
        res.status(200).send({message:"saved",findingdetatils})
    } catch (error) {
        console.error('Error find person detatils :' , error);
        res.status(500).send({message:error.message}) 
    }
      
 }

 const referbyemail = async(req,res) => {
    try {
           
        const {email,password} = req.body;
        const person = await db.studentDetails.findOne({
             where :{
                email : email,
             }
        })
           if(person === null){
             return res.status(404).send({message:"email is not found"});
           }
           
        const findingdetatils = await db.studentDetails.findOne({
             where: {
                 email : email,
                password : password,
             } 
     });
          
          if(findingdetatils == null){
           return res.status(401).send({message:"Account is not found"});
          }
          console.log(findingdetatils.id)
       
      return  res.status(200).send({message:"saved",id : findingdetatils.id})
    } catch (error) {
        console.error('Error find student detatils :' , error);
       return res.status(500).send({message:error.message}) 
    }
      
 }
 // Get student details by ID
const getStudentDetailsById = async (req, res) => {
    try {
        const { studentId}  = req.body;
        console.log(studentId,"-------------------");
        const student = await db.studentDetails.findOne({ where: { id: studentId } });
            
        if (student === null) {
            return res.status(404).send({ message: "Student not found" });
        }

        res.status(200).send(student);
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).send({ message: error.message });
    }
};


module.exports = {
    addstudentDetails,
    getstudentdetails,
    referbyemail,
    getStudentDetailsById,
}
