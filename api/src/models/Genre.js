const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    }
  },
  {
    timestamps: false
  });
};
