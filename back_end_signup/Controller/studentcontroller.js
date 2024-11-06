// const { Op } = require('sequelize');
const { Op } = require("sequelize");
const db = require('../models')
// const { Op } = require('sequelize');
const fs = require('fs');
const path = require("path");
// const path = require('images');  //images
// const XLSX = require('xlsx');




const insertstudent = async (req,res) => {
    try {
        const { name, email, age, phone } = req.body;
    
        // Check if a student with the same email already exists
        const existingStudent = await db.student.findOne({ where: { email } });
    
        if (existingStudent) {
          // If the email exists, return a 401 status with a message
          return res.status(401).send({ message: "Account already exists" });
        }
    
        // If the email does not exist, create a new student
        const student = await db.student.create({ name, email, age, phone });
        res.status(200).send({ message: "Saved successfully", student });
      } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send({ message: error.message });
      }
 }

 const getStd = async (req, res)=>{
    try {

        const {name,email,age,phone} = req.body;
        console.log("name",name)
        const findingdetatils = await db.student.findAll({
            name,
            email : email,
            age : age,
            phone :phone,

        });
        res.status(200).send({message:"saved",findingdetatils})
    } catch (error) {
        console.error('Error find person detatils :' , error);
        res.status(500).send({message:error.message}) 
    }
      
 }
 const getid = async (req,res)=>{
    try{
        const {courseId} = req.body;
        const finddetatils = await db.student.findAll({ });
        res.status(200).send({message:"saved",finddetatils})
    }
    catch(error){
        console.error('Error find person detatils :' , error);
        res.status(500).send({message:error.message}) 
    }
   };


 const getStudentByEmail = async (req, res) => {
    const { email } = req.body;
  
    try {
    //   const studentDetails = await db.student.findOne({ where: { email } });

    const students = await db.student.findAll({
        attributes: ['email'], // Select only the email column
        where: {
            email: {
                [db.Sequelize.Op.like]: `${email}%` // Match emails starting with the input
            }
        }
    });

    const emails = students.map(student => student.email);
    
    console.log("Emails found:", emails); // Debugging statement

    if (emails.length > 0) {
        res.status(200).json({ emails });
    } else {
        res.status(404).json({ message: 'No emails found.' });
    }
} catch (error) {
    console.error('Error fetching student details:', error); // Log the error
    res.status(500).send({ message: error.message });
}
  };


//   const { Op } = require('sequelize'); // Import Op from Sequelize

const getStudentByEmaill = async (req, res) => {
    const { email } = req.body;
  
    try {
        console.log("Searching for emails starting with:", email); // Debugging statement

        // Find emails that start with the input characters
        const students = await db.student.findAll({
            attributes: ['email'], // Select only the email column
            where: {
                email: {
                    [Op.like]: `${email}%` // Match emails starting with the input
                }
            }
        });

        const emails = students.map(student => student.email);
        
        console.log("Emails found:", emails); // Debugging statement

        if (emails.length > 0) {
            res.status(200).json({ emails });
        } else {
            res.status(404).json({ message: 'No emails found.' });
        }
    } catch (error) {
        console.error('Error fetching student details:', error); // Log the error
        res.status(500).send({ message: error.message });
    }
};

const referbyemail = async (req, res) => {
    try {
        // Check if req.body has been correctly parsed
        console.log("Request body:", req.body);
        
        const { email } = req.body;
        console.log("Extracted email:", email);  // Log the extracted email

        if (!email) {
            return res.status(400).send({ message: "Email is required." });
        }

        // Find the student by email
        const person = await db.student.findOne({
            where: {
                email: email,
            }
        });

        if (person === null) {
            return res.status(404).send({ message: "Email not found. Please create a new account." });
        }

        console.log("Found person ID:", person.id);

        // Return success message
        return res.status(200).send({ message: "Email exists. Please log in.", id: person.id });

    } catch (error) {
        console.error('Error finding student details:', error);
        return res.status(500).send({ message: error.message });
    }
};

const checkemailandphone = async (req, res) => {
    try {
        // Check if req.body has been correctly parsed
        console.log("Request body:", req.body);
        
        const { email,phone } = req.body;
        console.log("Extracted email:", email);  // Log the extracted email

        if (!email) {
            return res.status(400).send({ message: "Email is required." });
        }
        else if(!phone){
            return res.status(400).send({ message: "phone number  is required." }); 
        }

        // Find the student by email
        const person = await db.student.findOne({
            where: {
                email: email,
                
            }
        });

        if (person === null) {
            return res.status(404).send({ message: "Email not found. Please create a new account." });
        }

        console.log("Found person ID:", person.id);

        // Return success message
        return res.status(200).send({ message: "Login successfully go to Home page", id: person.id });

    } catch (error) {
        console.error('Error finding student details:', error);
        return res.status(500).send({ message: error.message });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await db.student.findAll(); // Use db.student to fetch students
        res.status(200).json(students); // Return the students as JSON
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send({ message: 'Server error', error });
    }
};

const findStudentById = async (req, res) => {
    const { id } = req.params; // Extract id from request body
    console.log(id);

    if (!id) {
        return res.status(400).json({ error: 'Student ID is required' }); // Return a 400 error if id is not provided
    }

    try {
        const studentDetails = await db.student.findByPk(id); // Fetch the student by primary key

        if (!studentDetails) {
            return res.status(404).json({ error: 'Student not found' }); // Return a 404 error if no student found
        }

        return res.status(200).json(studentDetails); // Return the student details if found
    } catch (error) {
        console.error('Error finding student:', error);
        return res.status(500).json({ error: 'An error occurred while retrieving student details' }); // Handle unexpected errors
    }
};



const findStudentByid = async (req, res) => {
    try {
      const { id } = req.params; // Get the student ID from request parameters
  
      // Fetch the student by primary key
      const studentDetails = await db.student.findByPk(id);
  
      if (!studentDetails) {
        return res.status(404).json({ error: 'Student not found' }); // Return a 404 error if no student found
      }
  
      if (!studentDetails.imagepath) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      // Read the image file from the path stored in the database
      const filePath = path.resolve(studentDetails.imagepath); // Get absolute path
      fs.readFile(filePath, (err, data) => {
        if (err) {
          return res.status(500).json({ message: 'Error reading image file.' });
        }
  
        // Set the response header and send the image as a response
        res.setHeader('Content-Type', 'image/jpeg');
        return res.status(200).send(data);
      });
    } catch (error) {
      console.error('Error fetching student details:', error);
      res.status(500).json({ message: 'Error fetching student details', error: error.message });
    }
  };

//   const findStudentByIdDetails = async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       const studentDetails = await db.student.findByPk(id);
  
//       if (!studentDetails) {
//         return res.status(404).json({ error: 'Student not found' });
//       }
  
//       // Do not send the image path for now
//       const { imagepath, ...restDetails } = studentDetails.dataValues;
//       res.status(200).json(restDetails);
//     } catch (error) {
//       console.error('Error fetching student details:', error);
//       res.status(500).json({ message: 'Error fetching student details' });
//     }
//   };
  

  const getStudentImage = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id,"========================>id")
      const studentDetails = await db.student.findByPk(id);
        console.log(studentDetails,"===================================>");
        console.log(studentDetails.imagepath,"=========================>")
      if (!studentDetails || !studentDetails.imagepath) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      const imagePath = path.resolve(studentDetails.imagepath); // Get absolute path to the image

      fs.readFile(imagePath, (err, data) => {
        if (err) {
          return res.status(500).send({ message: 'Error reading image file.' });
        }
  
        res.setHeader('Content-Type', 'image/jpeg'); // Ensure correct content type for image
        return res.status(200).send(data); // Send image data
      });

    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ message: 'Error fetching image' });
    }
  };
  


const uploadimage = async (req, res) => {
    try {
        const { id } = req.body; // Extract student ID from request body
        console.log(id, "-------------------------->");

        if (!req.file) {
            return res.status(400).json({ message: "Error: No file uploaded" });
        }
      
        if (!id) {
            return res.status(400).json({ message: "Error: No student ID provided" });
        }

        const imagepath = req.file.path; // Get the file path from Multer's file object
        console.log(imagepath, "Image path ------------------>");

        // Update the student's image path in the database
        await db.student.update({ imagepath: imagepath }, { where: { id: id } });

        console.log("File uploaded and student updated successfully.");

        // Send success response
        res.status(200).json({ message: 'Upload successful', imagepath });
    } catch (error) {
        console.error("Error uploading image: ", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


// const insertquestions = async (req, res) => {
//   if (!req.file) {
//       return res.status(400).send({ message: "No file uploaded" });
//   }

//   const filepath = req.file.path;
//   const workbook = XLSX.readFile(filepath);
//   const sheetName = workbook.SheetNames[0];
//   const worksheet = workbook.Sheets[sheetName];
//   const data = XLSX.utils.sheet_to_json(worksheet);

//   const validRows = [];

//   for (const row of data) {
//       const { questionNumber, questionName } = row;

//       if (questionNumber !== undefined && questionName !== undefined) {
//           validRows.push({
//               questionNumber: questionNumber,
//               questionName: questionName,
//           });
//       } else {
//           console.log("Skipping row due to missing data:", row);
//       }
//   }

//   if (validRows.length === 0) {
//       return res.status(400).send({ message: "No valid rows to insert." });
//   }

//   try {
//       await db.question.bulkCreate(validRows); // Ensure that 'question' is properly imported
//       res.status(200).send({ message: 'Success: Questions inserted' });
//   } catch (error) {
//       console.error('Error details:', error);
//       res.status(500).send({ message: 'Error inserting questions', error: error.message || error });
//   }
// };

const GettingallProfiles = async (req, res) => {
    try {
      const students = await db.student.findAll({
        attributes: ['id', 'name','email','phone','age', 'imagepath'] // Fetch only required fields
      });
        console.log("students===========>", students);
      if (!students.length) {
        return res.status(404).json({ error: 'No students found' });
      }
  
      const studentsWithImages = students.map(student => {
        const imagePath = path.resolve(student.imagepath); // Get absolute path to the image
        const imageData = fs.existsSync(imagePath) ? fs.readFileSync(imagePath).toString('base64') : null;
  
        return {
          id: student.id,
          name: student.name,
          age :student.age,
          email:student.email,
          phone:student.phone,
          imagepath: imageData ? `data:image/jpeg;base64,${imageData}` : null
        };
      });
  
      return res.status(200).json(studentsWithImages);
    } catch (error) {
      console.error('Error fetching student profiles:', error);
      res.status(500).json({ message: 'Error fetching student profiles' });
    }
  };
  





// const GettingallProfiles = async (req, res) => {
//     try {
//       // Fetch all students from the database
      
  
//       if (!students || students.length === 0) {
//         return res.status(404).json({ error: 'No student profiles found' });
//       }
  
//       // Initialize an array to hold the student images
//       const imagesData = [];
  
//       for (let student of students) {
//         if (student.imagepath) {
//           const imagePath = path.resolve(student.imagepath); // Resolve the image path
  
//           try {
//             // Read the image file for each student
//             const imageData = fs.readFileSync(imagePath);
  
//             // Convert image data to base64 and add to the imagesData array
//             const base64Image = imageData.toString('base64');
//             imagesData.push({
//               id: student.id,
//               name: student.name,
//               email: student.email,
//               image: `data:image/jpeg;base64,${base64Image}`, // Embed the image as base64
//             });
//           } catch (err) {
//             console.error(`Error reading image for student ${student.id}:`, err);
//           }
//         } else {
//           imagesData.push({
//             id: student.id,
//             name: student.name,
//             email: student.email,
//             image: null, // No image available
//           });
//         }
//       }
  
//       // Send back the array of student images (and their details)
//       res.status(200).json(imagesData);
  
//     } catch (error) {
//       console.error('Error fetching student profiles:', error);
//       res.status(500).json({ message: 'Error fetching student profiles' });
//     }
//   };


module.exports = {
    insertstudent,
    getStd,
    getStudentByEmail,
    getStudentByEmaill,
    getid,
    referbyemail,
    checkemailandphone,
    getAllStudents,
    findStudentById,
    uploadimage,
    findStudentByid,
    // findStudentByIdDetails,
    getStudentImage,
    GettingallProfiles,
    
}