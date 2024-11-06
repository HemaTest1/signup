const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const subject = sequelize.define('subject', {
        subject_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subject_name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        }
    }, {
        tableName: 'subjects',
        timestamps: false 
    });


    return subject;
};