'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pet.init({
    name: DataTypes.STRING,
    TypeId: DataTypes.INTEGER,
    breed: DataTypes.STRING,
    age: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    description: DataTypes.STRING,
    healthStatus: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};