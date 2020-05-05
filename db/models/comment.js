'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    text: DataTypes.TEXT
  }, {});
  comment.associate = function(models) {
    comment.belongsTo(models.post, {
      foreignKey: 'postId',
      as: 'post',
      onDelete: 'CASCADE'
    });
    comment.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'owner',
      onDelete: 'CASCADE'
    });
  };
  return comment;
};