const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/personConfig');

module.exports = (sequelize) => {
const results = sequelize.define('results', {
  results_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  marks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updated_time: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'results', // Table name in the database
  timestamps: false,
});
  return  results;
}
