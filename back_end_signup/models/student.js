const {DataTypes} = require('sequelize')
// const { Sequelize } = require('.')

module.exports = (sequelize) => {
    const student = sequelize.define('student', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        age: {  
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        imagepath: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'students',  // Optional: specify the table name in the database
        timestamps: false,      // Disable createdAt and updatedAt fields if not needed
    });

    return student;
};