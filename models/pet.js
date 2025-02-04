"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pet.belongsTo(models.Type);
      Pet.belongsTo(models.User);
      Pet.hasMany(models.AdoptionRequest);
    }
  }
  Pet.init(
    {
      name: DataTypes.STRING,
      TypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Types",
          key: "id",
        },
      },
      breed: DataTypes.STRING,
      age: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      description: DataTypes.STRING,
      healthStatus: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
