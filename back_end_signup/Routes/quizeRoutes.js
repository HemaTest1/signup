const express = require('express');
const quizRouter = express.Router();
const quizController = require("../Controller/quizcontroller");

// Route to fetch all questions and options
quizRouter.get('/questions', quizController.getQuestions);

// Route to check the answer
quizRouter.post('/check-answer', quizController.checkAnswer);

quizRouter.get('/question/:id', quizController.getQuestionWithAnswers);

module.exports = quizRouter;
