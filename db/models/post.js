'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  post.associate = function(models) {
    post.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'owner',
      onDelete: 'CASCADE'
    });
    post.hasMany(models.comment, {
      foreignKey: 'postId',
      as: 'comments',
      onDelete: 'CASCADE'
    });
  };
  return post;
};