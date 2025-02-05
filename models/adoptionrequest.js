"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdoptionRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdoptionRequest.belongsTo(models.User);
      AdoptionRequest.belongsTo(models.Pet);
    }
  }
  AdoptionRequest.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      PetId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Pets",
          key: "id",
        },
      },
      status: DataTypes.STRING,
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Reason is required",
          },
          notNull: {
            msg: "Reason is required",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          instance.status = "Pending";
        },
      },
      sequelize,
      modelName: "AdoptionRequest",
    }
  );
  return AdoptionRequest;
};
