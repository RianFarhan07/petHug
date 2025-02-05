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

    static gender() {
      return ["Male", "Female"];
    }

    static healthStatus() {
      return [
        "Healthy",
        "Needs Medical Attention",
        "Under Treatment",
        "Recovered",
      ];
    }

    static async findRandom() {
      const pets = await Pet.findAll({
        order: sequelize.random(),
        limit: 6,
        include: {
          model: sequelize.models.Type,
        },
      });
      return pets;
    }

    static async findLongest() {
      const pets = await Pet.findAll({
        order: [["createdAt", "ASC"]],
        limit: 6,
        include: {
          model: sequelize.models.Type,
        },
      });
      return pets;
    }
  }
  Pet.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Pet name is required" },
          notEmpty: { msg: "Pet name cannot be empty" },
        },
      },
      TypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Types",
          key: "id",
        },
        validate: {
          notNull: { msg: "Pet type is required" },
          notEmpty: { msg: "Please select a pet type" },
        },
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Breed is required" },
          notEmpty: { msg: "Breed cannot be empty" },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Age is required" },
          notEmpty: { msg: "Age cannot be empty" },
          isInt: { msg: "Age must be a number" },
          min: {
            args: [0],
            msg: "Age cannot be negative",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Price is required" },
          notEmpty: { msg: "Price cannot be empty" },
          isInt: { msg: "Price must be a number" },
          min: {
            args: [0],
            msg: "Price cannot be negative",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Gender is required" },
          notEmpty: { msg: "Gender cannot be empty" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      healthStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Health status is required" },
          notEmpty: { msg: "Health status cannot be empty" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        validate: {
          notNull: { msg: "User ID is required" },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      adopted: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      hooks: {
        beforeCreate: (pet) => {
          pet.adopted = false;
        },
      },
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
