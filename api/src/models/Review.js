const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

  sequelize.define('review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    score: {
      type: DataTypes.ENUM("1","2","3","4","5","6","7","8","9","10"),
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    timestamps: false
  });
};
