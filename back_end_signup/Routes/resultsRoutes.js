const express= require('express')
const resultsRouter = express.Router();
const resultscontroller = require("../Controller/resultscontroller");
const multer = require('multer');

resultsRouter.post('/', resultscontroller.createResult);
resultsRouter.get('/', resultscontroller.getAllResults);
resultsRouter.get('/:id', resultscontroller.getResultById);
resultsRouter.put('/:id', resultscontroller.updateResult);
resultsRouter.delete('/:id', resultscontroller.deleteResult);
resultsRouter.post('/studentid', resultscontroller.createOrUpdateResult);


module.exports =  resultsRouter;