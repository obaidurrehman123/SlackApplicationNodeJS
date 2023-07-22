'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "to" })
      this.belongsTo(User, { foreignKey: "from" })
    }
  }
  Message.init({
    messages: DataTypes.TEXT,
    to: DataTypes.UUID,
    from: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Message',
    tableName:'messages'
  });
  return Message;
};