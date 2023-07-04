const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('Test', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    },{
      timestamps:false
    });
};
