"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class workspace_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Workspace, workspace_user }) {
      this.belongsTo(Workspace, { foreignKey: "w_id" });
      this.belongsTo(User, {
        through: workspace_user,
        foreignKey: "u_id",
      });
    }
  }
  workspace_user.init(
    {
      w_id: DataTypes.STRING,
      u_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "workspace_user",
    }
  );
  return workspace_user;
};
