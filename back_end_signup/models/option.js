const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/personConfig');

module.exports = (sequelize) => {
    const option = sequelize.define('option', {
        option_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        },
        option_description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{
        tableName: 'options',
        timestamps: false,
    });

    return option;  
};