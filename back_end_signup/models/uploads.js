// models/upload.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const uploads = sequelize.define('Upload', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true  // This will store the uploaded file's name
        }
    }, {
        tableName: 'uploads',
        timestamps: false
    });

    return uploads;
};
