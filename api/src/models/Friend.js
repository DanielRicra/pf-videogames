const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('friend', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.ENUM('Pending','Rejected','Accepted'),
        allowNull: true,
        defaultValue: 'Pending'
    }
  },
  {
    timestamps: false
  });
};