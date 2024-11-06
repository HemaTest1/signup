const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/personConfig');

module.exports = (sequelize) => {
    const answer = sequelize.define('answer', {
        question_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        option_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
     },
        answer_description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'answers',
        timestamps: false,
    });

    return answer;  
};