const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/personConfig');

module.exports = (sequelize) => {
    const topic = sequelize.define('topic', {
        topic_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        topic_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subject_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'topics',
        timestamps: false // Enabling timestamps for tracking purposes
    });


    return topic;
};