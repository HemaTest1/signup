// const { Uploads} = require('../models'); // Import your Upload model
const uploads = require('../models/uploads');
const db = require('../models');

// const uploadFile = (req, res) => {
//     Upload.single('image')(req, res, async (err) => {
//         if (err) {
//             console.error("File upload error:", err);
//             return res.status(500).json({ message: "File upload error", error: err });
//         }

//         if (!req.file) {
//             console.log("No file uploaded");
//             return res.status(400).json({ message: "No file uploaded" });
//         }

//         const image = req.file.filename; // Get the uploaded image filename
//         const studentId = req.body.studentId; // Assuming studentId is sent in the request body

//         try {
//             // Find the upload record and update the image path
//             const result = await Upload.update(
//                 { image: image }, // Update the image field
//                 { where: { id: studentId } } // Condition to find the record
//             );

//             if (result[0] === 0) { // If no records were updated
//                 return res.status(404).json({ message: "Upload record not found" });
//             }

//             return res.json({ status: "Success", message: "File uploaded and database updated!" });
//         } catch (error) {
//             console.error("Database query error:", error);
//             return res.status(500).json({ message: "Error saving to database", error: error });
//         }
//     });
// };

const  uploadimage = async (req,res) => {
    const { studentid} = req.body; 

       if(!req.file){
         throw new Error ("ERRor");
       }
    //    const fileFormat = req.file.originalname.split('.').pop().toLowerCase();
       const imagepath = req.file.path;
       await db.uploads.update({image : imagepath}, {where : { id : studentid}})

       res.status(200).send({message : 'success ',imagepath})
}


const XLSX = require('xlsx');

const processExcel = async (req) => {
    if (!req.file) {
        throw new Error("No file uploaded");
    }
    const {topic_id} = req.params;
    console.log(topic_id, "===============================>topiceid")
    const filepath = req.file.path;
    const workbook = XLSX.readFile(filepath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Utility functions to handle formatting
    const preserveStringFormat = (value) => (value != null ? String(value) : '');
    const cleanString = (value) => (value != null ? String(value).trim().replace(/\s+/g, ' ').toLowerCase() : '');

    for (const row of data) {
        const question_description = preserveStringFormat(row["question_description"]);
        const option1 = cleanString(row["option1"]);
        const option2 = cleanString(row["option2"]);
        const option3 = cleanString(row["option3"]);
        const answer_description = preserveStringFormat(row["answer_description"]);
        

        
        console.log("Processing question:", question_description);


        // Check if the question already exists
        const existingQuestion = await db.question.findOne({
            where: { question_description: JSON.stringify(question_description) }
        });
        if (existingQuestion) {
            console.log(`Question already exists: ${question_description}`);
            continue;  // Skip to the next row if the question already exists
        }

        // Insert the question since it doesn't exist in the database
        const question = await db.question.create({
            topic_id: topic_id,
            question_description: question_description,
        });

        const questionId = question.question_id;
        console.log("New question inserted with ID:", questionId);

        // Insert options and store their IDs
        const options = [option1, option2, option3];
        const optionIds = [];

        for (const optionText of options) {
            if (optionText) {
                const option = await db.option.create({
                    question_id: questionId,
                    option_description: optionText,
                });
                optionIds.push(option.option_id); // Store the ID for later use
            }
        }
        console.log("Option IDs for question:", optionIds);

        // Insert answers with correct option IDs
        const answerDescriptions = answer_description.split(',').map(opt => cleanString(opt));
        for (const answerText of answerDescriptions) {
            const correctOptionIndex = options.indexOf(answerText);
            if (correctOptionIndex >= 0) {
                await db.answer.create({
                    option_id: optionIds[correctOptionIndex],
                    answer_description: answerText,
                });
                console.log(`Answer inserted: ${answerText} for option ID ${optionIds[correctOptionIndex]}`);
            } else {
                console.log(`No matching option found for answer: ${answerText}`);
            }
        }
    }
};



module.exports = {
    uploadimage,
    processExcel,
}
