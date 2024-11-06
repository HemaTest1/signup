const db = require('../models'); // Ensure the path is correct
const XLSX = require('xlsx');
const fs = require('fs')


const ExcelA = async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No file uploaded" });
    }

    // const filepath = req.file.path;

    // Read the Excel file
    const workbook = XLSX.readFile(req.file);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet data to JSON format
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log(data, "================data");

    // Array to hold valid rows for insertion
    const validRows = [];
    
    // Iterate over the rows in the Excel sheet
    for (const row of data) {
        const { answer, questionNumber } = row;

        // Log each row for debugging
        console.log("Processing row:", row);
        console.log(answer, "=======================");

        // Check if the required fields are present
        if (answer !== undefined && questionNumber !== undefined) {
            validRows.push({
                answer: answer,
                questionNumber: questionNumber,
            });
        } else {
            console.log("Skipping row due to missing data:", row);
        }
    }

    console.log(validRows.length, "==========================length");

    // Check if there are valid rows to insert
    if (validRows.length === 0) {
        return res.status(400).send({ message: "No valid rows to insert." });
    }

    try {
        // Use Sequelize's create method to insert rows one by one
        for (const row of validRows) {
            console.log("Inserting row:", row);
            await db.answer.create(row); // Create each row individually
        }
        
        res.status(200).send({ message: 'Success' });
    } catch (error) {
        // Log error details and send appropriate response
        console.error('Error details:', error);
        res.status(500).send({ message: 'Error inserting data', error: error.message || error });
    }



};

const corectanswer = async (req, res) => {
    // Extracting question_id from req.params
    const { questionId } = req.params; // use req.params.questionId directly

    try {
        // Fetching the correct answer based on question_id
        const correctAnswer = await db.answer.findOne({
            where: {
                question_id: questionId // Use the questionId to find the correct answer
            }
        });

        // Check if the correct answer was found
        if (!correctAnswer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        // Return the correct answer
        res.json(correctAnswer);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const checkAnswer = async (req, res) => {
    try {
        const { question_id, option_id } = req.body;

        const answer = await db.answer.findOne({
            where: { question_id, option_id },
        });

        if (answer) {
            res.status(200).json({ correct: true, message: "Correct answer!" });
        } else {
            res.status(200).json({ correct: false, message: "Incorrect answer." });
        }
    } catch (error) {
        console.error("Error checking answer:", error);
        res.status(500).json({ message: "Failed to check answer" });
    }
};

const getQuestionWithAnswers = async (req, res) => {
    const questionId = req.params.id;
  
    try {
      // Fetch the question with associated answers
      const question = await db.question.findOne({
        where: { question_id: questionId },
        include: [
          {
            model: db.answer,
            as: 'answers', // Alias used in the association
          },
        ],
      });
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      res.status(200).json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching question' });
    }
  };

  const getanswer = async (req, res) => {
    const { questionId } = req.params;

    try {
        const answer = await Answer.findOne({
            where: {
                question_id: questionId,
            }
        });

        if (!answer) {
            return res.status(404).json({ message: 'Answer not found for this question' });
        }

        return res.json({
            question_id: answer.question_id,
            option_id: answer.option_id,
            answer_description: answer.answer_description
        });
    } catch (error) {
        console.error("Error fetching the answer:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    ExcelA,
    corectanswer,
    checkAnswer,
    getQuestionWithAnswers,
    getanswer,
};
