const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('chat', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
  },
  {
    timestamps: false
  });
};