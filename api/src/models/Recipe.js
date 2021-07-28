const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {

    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },

    spoonacularScore: {
      type: DataTypes.INTEGER,
    },
    
    healthScore: {
      type: DataTypes.INTEGER,
    },

    instructions: {
      type: DataTypes.TEXT
    },

    image: {
      type: DataTypes.TEXT
    }

  });
};
