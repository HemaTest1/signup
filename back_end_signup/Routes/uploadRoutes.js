const express = require('express');
const uploadRouter = express.Router();
const uploadController = require("../Controller/Upload");  // Import the controller
const multer = require('multer');
const upload =multer({dest : 'public/images/'})

// Route for handling file uploads
uploadRouter.post("/upload", upload.single('image'), uploadController.uploadimage);
// uploadRouter.post("/insertdata", uploadController.insertPerson);

module.exports = uploadRouter; // Correct the export name
