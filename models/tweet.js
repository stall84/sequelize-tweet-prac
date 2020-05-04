'use strict';
module.exports = (sequelize, DataTypes) => {
  const tweet = sequelize.define('tweet', {
    message: DataTypes.STRING
  }, {});
  tweet.associate = function (models) {
    // associations can be defined here
    tweet.belongsTo(models.user);
  };
  return tweet;
};