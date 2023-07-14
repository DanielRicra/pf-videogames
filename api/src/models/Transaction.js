const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    }
  },);
};