'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    user.hasMany(models.post, {
      foreignKey: 'userId',
      as: 'posts',
      onDelete: 'CASCADE'
    });
    user.hasMany(models.comment, {
      foreignKey: 'userId',
      as: 'comments',
      onDelete: 'CASCADE'
    });
  };
  return user;
};