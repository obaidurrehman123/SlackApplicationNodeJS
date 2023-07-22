"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Workspace, User, channelmembers }) {
      // define association here
      this.belongsTo(Workspace, { foreignKey: "workspace_id" });
      this.belongsToMany(User, {
        through: channelmembers,
        foreignKey: "channelID",
      });
    }
  }
  Channel.init(
    {
      channel_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Channel",
      tableName: "channels",
    }
  );
  return Channel;
};
