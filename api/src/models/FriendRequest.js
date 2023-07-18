const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('friendRequest', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.ENUM('Pending','Rejected','Accepted'),
        allowNull: true,
    }
  },
  {
    timestamps: false
  });
};