
const express = require('express');
const uploadexcelRouter = express.Router();
const uploadexcelcontroller = require("../Controller/uploadExcel");
const multer = require('multer');

// Set up Multer to store uploaded files
const upload = multer({ dest: 'excel/' });

// Route to upload and process the Excel file
uploadexcelRouter.post('/upload-questions/:topic_id', upload.single('file'), async (req, res) => {
    try {
        // processExcel should not send a response, the route handler will handle that
        await uploadexcelcontroller.processExcel(req); // processExcel should not return a response
        res.status(200).send({ message: "Excel data processed successfully." }); // Send the success message as a single argument
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message }); // Handle errors
    }
});

module.exports = uploadexcelRouter;