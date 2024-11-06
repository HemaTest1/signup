const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const studentDetails = sequelize.define('student', {
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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'studentDetails',  // Custom table name: 'studentDetails'
        timestamps: false,            // Disable 'createdAt' and 'updatedAt'
    });

    return studentDetails;
};
