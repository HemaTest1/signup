const express= require('express')
const topicRouter = express.Router();
const topiccontroller = require("../Controller/topiccontroller");
// const multer = require('multer');
// const upload =multer({dest : 'excel/'});




topicRouter.post('/savetopic',topiccontroller.savetopic);
topicRouter.get('/gettopics',topiccontroller.getalltopics);
topicRouter.delete('/topics/:topic_id',topiccontroller.deletetopic);
topicRouter.get('/getQuestionsByTopic/:topic_id',topiccontroller.getQuestionsByTopic);
topicRouter.get('/getTopicsBySubject/:subjectId',topiccontroller.getTopicsBySubject);



module.exports = topicRouter;





