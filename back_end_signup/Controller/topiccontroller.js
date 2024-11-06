const db = require('../models');



const savetopic = async (req,res) => {
    try {
        const {subject_id,topic_name} = req.body;
        console.log("subject_name ",topic_name)
        const topic = await db.topic.create({
            subject_id  : subject_id,
            topic_name : topic_name
        });
        
        res.status(200).send({message:"saved"})
    } catch (error) {
        console.error('Error adding topic:', error);
        res.status(500).send({message:error.message})
    }
};

const getalltopics = async (req, res) => {
    try {
        const topics = await db.topic.findAll();
        res.status(200).json(topics);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};

// Delete Topic Function
const deletetopic = async (req, res) => {
    try {
        const { topic_id } = req.params; // Assuming topic_id is passed as a URL parameter

        // Check if the topic exists
        const topic = await db.topic.findByPk(topic_id);
        if (!topic) {
            return res.status(404).send({ message: "Topic not found" });
        }

        // Delete the topic
        await db.topic.destroy({
            where: { topic_id: topic_id }
        });

        res.status(200).send({ message: "Topic deleted successfully" });
    } catch (error) {
        console.error('Error deleting topic:', error);
        res.status(500).send({ message: error.message });
    }
};

const getQuestionsByTopic = async (req, res) => {
    const { topic_id } = req.params; // Get the topic ID from request parameters

    try {
        // Find questions where the topic_id matches
        const questions = await db.question.findAll({
            where: { topic_id: topic_id },
            attributes: ['question_id', 'question_description'] // Select only necessary fields
        });

        // If no questions are found, return a 404 response
        if (questions.length === 0) {
            return res.status(404).send({ message: 'No questions found for this topic' });
        }

        res.status(200).json(questions); // Return questions in JSON format
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).send({ message: error.message });
    }
};

// Get topics by subject ID
const getTopicsBySubject = async (req, res) => {
    try {
        const { subjectId } = req.params; // Assuming you named the route parameter `subjectId`
        const topics = await db.topic.findAll({
            where: { subject_id: subjectId } // Filter by subject_id
        });
        
        res.status(200).json(topics);
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).send({ message: error.message });
    }
};

// Get questions by topic ID
// const getQuestionsByTopic = async (req, res) => {
//     try {
//         const { topicId } = req.params; // Get topicId from URL parameters
//         const questions = await db.question.findAll({
//             where: { topic_id: topicId }, // Assuming you have a topic_id foreign key in questions table
//             include: [{ model: db.answer }] // Include related answers if using Sequelize ORM
//         });

//         res.status(200).json(questions);
//     } catch (error) {
//         console.error('Error fetching questions:', error);
//         res.status(500).send({ message: error.message });
//     }
// };



module.exports = {
    savetopic,
    getalltopics,
    deletetopic,
    getQuestionsByTopic,
    getTopicsBySubject,
}