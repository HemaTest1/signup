const {DataTypes} = require('sequelize')


module.exports = (sequelize) => {
const addressEntity = sequelize.define('addressEntity', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }, {
       
         tableName: 'address', // Optional: specify the table name
         timestamps: false,
      });
    return addressEntity;
};