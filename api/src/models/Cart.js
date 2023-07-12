const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('cart', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    }
  },
  {
    timestamps: false
  });
};