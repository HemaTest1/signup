const db = require('../models');  // Import models

// Fetch all questions and related options
const getQuestions = async (req, res) => {
    try {
        const questions = await db.question.findAll({
            include: [{ model: db.option, as: 'options' }],
        });
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Failed to fetch questions" });
    }
};

// Check if the selected option is correct
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
  
  const saveSubject = async (req, res) => {
    try {
        // Trim and retrieve subject_name from request body
        const subject_name = req.body.subject_name.trim();

        // Check if subject_name already exists in the database
        let subject = await db.subject.findOne({ where: { name: subject_name } });

        if (subject) {
            // If subject exists, return appropriate message and status code
            return res.status(400).json({ error: 'Subject already exists' });
        } else {
            // If subject does not exist, create a new subject
            subject = await db.subject.create({ subject_name: subject_name });
            return res.status(200).send(subject);
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

const saveTopic = async (req, res) => {
  try {
      // Retrieve and trim topic_name and subject_id from the request body
      const { topic_name, subject_id } = req.body;
      const trimmedTopicName = topic_name.trim();

      // Check if the subject_id exists
      const subject = await db.subject.findByPk(subject_id);
      if (!subject) {
          return res.status(400).send({ message: "Subject not found." });
      }

      // Check if the topic already exists for the given subject_id
      let topic = await db.topic.findOne({ where: { topic_name: trimmedTopicName, subject_id } });
      if (topic) {
          return res.status(400).json({ error: 'Topic already exists for this subject.' });
      }

      // Create new topic if it doesn't exist
      topic = await db.topic.create({ topic_name: trimmedTopicName, subject_id });

      res.status(200).send(topic);
  } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
  }
}
 
module.exports = {
   getQuestions, 
   checkAnswer,
   getQuestionWithAnswers,
   saveSubject,
   saveTopic,
  };
