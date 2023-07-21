const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'chat',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        defaultValue: [],
      },
    },
    {
      timestamps: false,
    }
  )
}
