'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserItem.belongsTo(models.TodoItem, {
        foreignKey: 'todoItemId',
        onDelete: 'CASCADE',
      });
      UserItem.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  };
  UserItem.init({
    assigned: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserItem',
  });
  return UserItem;
};