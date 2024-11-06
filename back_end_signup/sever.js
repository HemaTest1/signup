// In server.js
const express = require('express');
const cors = require("cors");
const db = require('./models');  // Sequelize models import
// const uploadroutes = require("../routes/uploadRoutes");  // Correct import for uploadRouter

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cors());
// Static folder to serve uploaded files
app.use('/uploads', express.static('uploads'));

const uploadroutes = require("./Routes/uploadRoutes");

app.use("/api", uploadroutes);  // Correct usage of uploadRouter

// Sync database and start the server
(async () => {
        try {
            await db.Sequelize.sync({ force: false });
            app.listen(PORT, () => {
                console.log(`Server is running on ${PORT}`);
            });
        } catch (error) {
            console.log('Error synchronizing database :' + error);
        }
    })();


// const express = require('express');
// const db = require('./models');  // This should point to the file that exports your MySQL connection
// const cors = require("cors");


// const app = express();
// const PORT = 3000;



// app.use(express.json());
// app.use(cors());

const personroutes = require('./Routes/personRoutes');
const studentroutes = require('./Routes/studentRoutes');
const courseroutes = require('./Routes/courseRoutes');
const stdcourseroutes = require('./Routes/stdcourseRoutes');
const studentdetailsroutes = require('./Routes/studentDetailsRoutes');
const employeeroutes = require('./Routes/employeeRotues');
const questionroutes = require('./Routes/questionRoutes');




// Use the routes
app.use("/api/person", personroutes);
app.use("/api/student", studentroutes);
app.use("/api/course", courseroutes);
app.use("/stdcourse", stdcourseroutes);
app.use("/api/studentdetails", studentdetailsroutes);
app.use("/api/employee", employeeroutes);
app.use("/api/question",questionroutes);


const optionroutes = require('./Routes/optionsRoutes')
const answerroutes = require('./Routes/answerRoutes')
const uploadexcelroutes = require('./Routes/uploadexcelRoutes');
const quizroutes = require('./Routes/quizeRoutes');
const topicroutes = require('./Routes/topicRoutes');
const subjectroutes = require('./Routes/subjectRoutes');
const sstudentroutes = require('./Routes/sstudentRoutes');
const resultsroutes = require("./Routes/resultsRoutes");


app.use('/option',optionroutes);
app.use('/answer',answerroutes);
app.use('/upload',uploadexcelroutes);
app.use('/api',quizroutes);
app.use('/subject',subjectroutes);
app.use('/topic',topicroutes);
app.use('/sstudent',sstudentroutes);
app.use('/results',resultsroutes);




// (async () => {
//     try {
//         await db.Sequelize.sync({ force: false });
//         app.listen(PORT, () => {
//             console.log(`Server is running on ${PORT}`);
//         });
//     } catch (error) {
//         console.log('Error synchronizing database :' + error);
//     }
// })();
