const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
const sstudent = sequelize.define('sstudent', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    student_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'sstudents', // Table name in the database
    timestamps: false,
});

return sstudent; // Export the model directly
}
