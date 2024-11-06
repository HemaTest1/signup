const {Sequelize, DataTypes} = require('sequelize');
const personConfig = require('../dbConfig/personConfig');
const PersonEntity = require('./PersonEntity');
const addressEntity = require('./addressEntity');
const student = require('./student');
const course = require('./course');
const studentDetails = require('./studentDetails');
const employee = require('./employee');
const mysql = require('mysql');
const uploads = require('./uploads');
const question = require('./question');
const  option = require('./option');
const answer = require('./answer');
const sstudent = require('./sstudent');
const results = require('./results');

const sequelize = new Sequelize(
    personConfig.DB,
    personConfig.USER,
    personConfig.PASSWORD,{
        host : personConfig.HOST,
        dialect:personConfig.dialect,
        pool:{
            max : personConfig.pool.max,
            min : personConfig.pool.min,
            idle : personConfig.pool.idle
        }
    });


    sequelize.authenticate()
    .then(() =>{
        console.log(`connected to the serve`)
    })
    .catch(err => {
        console.log(`Error connecting to the server`,err);
    });

    
    const db = {};
    db.Sequelize = Sequelize;
    db.Sequelize= sequelize;


    db.PersonEntity = require("./PersonEntity")(sequelize,DataTypes);
    db.addressEntity = require("./addressEntity")(sequelize,DataTypes);
    db.student = require("./student")(sequelize,DataTypes);
    db.course = require("./course")(sequelize,DataTypes);
    db.studentDetails = require("./studentDetails")(sequelize,DataTypes);
    db.employee = require("./employee")(sequelize,DataTypes);
    db.uploads = require("./uploads")(sequelize,DataTypes);
    db.question = require('./question')(sequelize,DataTypes);
    db.option = require('./option')(sequelize,DataTypes);
    db.answer = require('./answer')(sequelize,DataTypes);



    // Set up the one-to-one relationship
    db.PersonEntity.hasOne(db.addressEntity, {
    foreignKey: 'personId', // Foreign key in Address table
    as: 'address' // Alias for ease of access
    });
  
    db.addressEntity.belongsTo(db.PersonEntity, {
    foreignKey: 'personId',
    as: 'person'
    });
  
    db.student.belongsToMany(db.course, {
        through: 'StudentCourses', // Name of the join table
        foreignKey: 'studentId',    // Foreign key in the join table pointing to StudentEntity
        otherKey: 'courseId',       // Foreign key in the join table pointing to CoursePackageEntity
        as: 'courses'               // Alias for accessing related data
    });
    
    db.course.belongsToMany(db.student, {
        through: 'StudentCourses', // Name of the join table
        foreignKey: 'courseId',    // Foreign key in the join table pointing to CoursePackageEntity
        otherKey: 'studentId',     // Foreign key in the join table pointing to StudentEntity
        as: 'students'             // Alias for accessing related data
    });

 
   
    
// Import models

db.question = require('./question')(sequelize, DataTypes);
db.option = require('./option')(sequelize, DataTypes);
db.answer = require('./answer')(sequelize, DataTypes);
db.subject = require('./subject')(sequelize,DataTypes);
db.topic = require('./topic')(sequelize,DataTypes);
db.sstudent = require("./sstudent")(sequelize,DataTypes);
db.results = require("./results")(sequelize,DataTypes);

// Define associations
// One-to-many relationship between Question and Option
db.question.hasMany (db.option, {
  foreignKey: 'question_id',
  as: 'options',
});

// One-to-many relationship between Question and Answer
db.question.hasMany(db.answer, {
  foreignKey: 'question_id', // This should be question_id, not answer_id
  as: 'answers',
});


  db.option.hasMany(db.answer, {
      foreignKey: 'option_id',
      as: 'answers'
  });

  db.subject.hasMany(db.topic, {
      foreignKey: 'subject_id',
      as: 'topics'
  });
    
  // db.subject.hasMany(db.topic,{
  //     foreignKey: 'subject_id',
  //     as: 'subjects'

  // })



  db.topic.hasMany(db.question, {
    foreignKey: 'question_id',
    as: 'topics',
    
});

db.question.belongsTo(db.topic, {
    foreignKey: 'topic_id',
    as: 'questions' // Unique alias for the association
});

db.sstudent.hasOne(db.results, {
    foreignKey: 'student_id',
   
});
db.results.belongsTo(db.sstudent, {
    foreignKey: 'student_id'
});

    module.exports = db;