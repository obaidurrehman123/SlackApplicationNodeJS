"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Channel, channelmembers, Message }) {
      // define association here
      this.belongsToMany(Channel, {
        through: channelmembers,
        foreignKey: "userId",
      });
      this.hasMany(Message, { foreignKey: "to" })
      this.hasMany(Message, { foreignKey: "from" })
    }
  }

  User.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      photo: DataTypes.STRING,
      otp: DataTypes.STRING,
      otp_expires: DataTypes.DATE,
      isVerified: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,

      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};
