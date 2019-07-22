'use strict';
module.exports = (sequelize, DataTypes) => {
  const KeyWord = sequelize.define('KeyWord', {
    name: DataTypes.STRING
  }, {});
  KeyWord.associate = function(models) {
    // associations can be defined here
  };
  return KeyWord;
};