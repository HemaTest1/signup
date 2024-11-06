const db = require('../models'); // Ensure the path is correct
const XLSX = require('xlsx');

const Questions = require('../models/question');

const insertquestions = async (req, res) => {
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

    // Array to hold valid rows for bulk insertion
    const validRows = [];

    // Iterate over the rows in the Excel sheet
    for (const row of data) {
        const { questionNumber, questionName } = row;

        // Log each row for debugging
        console.log("Processing row:", row);

        // Check if the required fields are present
        if (questionNumber !== undefined && questionName !== undefined) {
            validRows.push({
                questionNumber: questionNumber,
                questionName: questionName,
            });
        } else {
            console.log("Skipping row due to missing data:", row);
        }
    }

    // Check if there are valid rows to insert
    if (validRows.length === 0) {
        return res.status(400).send({ message: "No valid rows to insert." });
    }

    try {
        // Use Sequelize's bulkCreate to insert all valid rows at once
        await Questions.bulkCreate(validRows);
        res.status(200).send({ message: 'Success: Questions inserted' });
    } catch (error) {
        // Log error details and send appropriate response
        console.error('Error details:', error);
        res.status(500).send({ message: 'Error inserting questions', error: error.message || error });
    }
};

const insertquestion = async (req,res) => {
    try {
        const {questionNumber,questionName} = req.body;
        console.log("name ",questionName)
        const question = await db.question.create({
           questionNumber : questionNumber,
           questionName : questionName
        });
        res.status(200).send({message:"saved"})
    } catch (error) {
        console.error('Error adding person:', error);
        res.status(500).send({message:error.message})
    }
};


const ExcelQ = async (req,res) => {
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
    const { questionNumber, questionName } = row;

    // Log each row for debugging
    console.log("Processing row:", row);

    // Check if the required fields are present
    if (questionNumber !== undefined && questionName !== undefined) {
        console.log(questionNumber, "=======================")
        validRows.push({
            questionNumber: questionNumber,
            questionName: questionName,
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
    await db.question.bulkCreate(validRows);
    res.status(200).send({ message: 'Success: Questions inserted' });
} catch (error) {
    // Log error details and send appropriate response
    console.error('Error details:', error);
    res.status(500).send({ message: 'Error inserting questions', error: error.message || error });
}
};


module.exports = {
    insertquestions,
    insertquestion,
    ExcelQ,
};
