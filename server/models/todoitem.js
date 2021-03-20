module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
  TodoItem.associate = (models) => {
    TodoItem.belongsTo(models.Todo, {
      foreignKey: 'todoId',
      onDelete: 'CASCADE',
    });
    TodoItem.hasMany(models.UserItem, {
      foreignKey: 'todoItemId',
      as: 'userItems',
      onDelete: 'CASCADE',
    });
    TodoItem.hasMany(models.Comment, {
      foreignKey: 'todoItemId',
      as: 'comments',
      onDelete: 'CASCADE',
    });
  };
  
  return TodoItem;
};
