const db = require('../models'); // Ensure the path is correct
const XLSX = require('xlsx');


const ExcelO = async (req,res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No file uploaded" });
    }

    const filepath = req.file.path;

    // Read the Excel file
    const workbook = XLSX.readFile(filepath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet data to JSON format
    const data = XLSX.utils.sheet_to_json(worksheet); 
    

    console.log(data , "================data")
    
    // Array to hold valid rows for bulk insertion
    const validRows = [];
 // Iterate over the rows in the Excel sheet
 for (const row of data) {
    const { option1, option2,option3,questionNumber } = row;

    // Log each row for debugging
    console.log("Processing row:", row);
    console.log(option1, "=======================")
    // Check if the required fields are present
    if (option1 !== undefined && option2 !== undefined && option3 !== undefined && questionNumber !== undefined) {
       
        validRows.push({
            option1: option1,
            option2: option2,
            option3:option3,
            questionNumber : questionNumber,
        });
    } else {
        console.log("Skipping row due to missing data:", row);
    }

}

console.log(validRows.length , "==========================length")
// Check if there are valid rows to insert
if (validRows.length === 0) {
    return res.status(400).send({ message: "No valid rows to insert." });
}

try {
    // Use Sequelize's bulkCreate to insert all valid rows at once
    console.log(validRows , "------------------------------validRows")
    await db.option.bulkCreate(validRows);
    res.status(200).send({ message: 'Success: Questions inserted' });
} catch (error) {
    // Log error details and send appropriate response
    console.error('Error details:', error);
    res.status(500).send({ message: 'Error inserting questions', error: error.message || error });
}
};
const getoptionsbyquestion = async (req, res) => {
    try {
        const questionId = req.params.qid; // Accessing questionId from params
        console.log(questionId, "====================> questionId"); // Debugging line

        // Fetching options for the specific question
        const options = await db.option.findAll({
            where: { 
                question_id: questionId // Filtering by question_id only
            }
        });

        // Logging the fetched options for debugging
        console.log(options, "====================> options fetched");

        // Responding with the options
        res.json(options);
    } catch (error) {
        console.error("Error fetching options:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports={
   
    ExcelO,
    getoptionsbyquestion,
    
}


































// const db = require('../models'); // Ensure the path is correct
// const XLSX = require('xlsx');

// const insertoptions = async (req, res) => {
//     if (!req.file) {
//         return res.status(400).send({ message: "No file uploaded" });
//     }

//     const filepath = req.file.path;

//     // Read the Excel file
//     const workbook = XLSX.readFile(filepath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];

//     const data = XLSX.utils.sheet_to_json(worksheet);
//     console.log("--------------------------", data);

//     try {
//         for (const row of data) {
//             const { option1,option2 } = row;

//             if (questionNumber !== undefined && questionName !== undefined) {
//                 await db.question.create({
//                     questionNumber : questionNumber,
//                     questionName : questionName,
//                 });
//             }
//         }
//         res.status(200).send({ message: 'Success: Questions inserted' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'Error inserting questions', error });
//     }
// };

// const insertquestions = async (req, res) => {
//     if (!req.file) {
//         return res.status(400).send({ message: "No file uploaded" });
//     }

//     const filepath = req.file.path;

//     // Read the Excel file
//     const workbook = XLSX.readFile(filepath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];

//     // Convert sheet data to JSON format
//     const data = XLSX.utils.sheet_to_json(worksheet);

//     // Array to hold valid rows for bulk insertion
//     const validRows = [];

//     // Iterate over the rows in the Excel sheet
//     for (const row of data) {
//         const { questionNumber, questionName } = row;

//         // Log each row for debugging
//         console.log("Processing row:", row);

//         // Check if the required fields are present
//         if (questionNumber !== undefined && questionName !== undefined) {
//             validRows.push({
//                 questionNumber: questionNumber,
//                 questionName: questionName,
//             });
//         } else {
//             console.log("Skipping row due to missing data:", row);
//         }
//     }

//     // Check if there are valid rows to insert
//     if (validRows.length === 0) {
//         return res.status(400).send({ message: "No valid rows to insert." });
//     }

//     try {
//         // Use Sequelize's bulkCreate to insert all valid rows at once
//         await db.question.bulkCreate(validRows);
//         res.status(200).send({ message: 'Success: Questions inserted' });
//     } catch (error) {
//         // Log error details and send appropriate response
//         console.error('Error details:', error);
//         res.status(500).send({ message: 'Error inserting questions', error: error.message || error });
//     }
// };

// module.exports = {
//     insertoptions,
//     insertquestions,
// };
