const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CoursePackage = sequelize.define('course', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        coursename: {   
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false,  // You can set this to an integer if duration is measured in months/years
        }
    }, {
        tableName: 'course_packages',  // Optional: specify the table name
        timestamps: false,             // Disable createdAt and updatedAt fields
    });

    return CoursePackage;
};