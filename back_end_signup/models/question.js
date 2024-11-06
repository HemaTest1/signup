// question model (question.js)
const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/personConfig');

 module.exports = (sequelize) => {
const question = sequelize.define('question', {
    question_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    question_description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'questions',
    timestamps: false,
});
return question;
 };