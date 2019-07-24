'use strict';
module.exports = (sequelize, DataTypes) => {
  const KeyWord = sequelize.define('KeyWord', {
    name: DataTypes.STRING
  }, {});
  KeyWord.associate = function(models) {
    // associations can be defined here
    KeyWord.hasMany(models.User,{
      foreignKey: 'keyWordOne_id'
    });
    KeyWord.hasMany(models.User,{
      foreignKey: 'keyWordTwo_id'
    });
    KeyWord.hasMany(models.User,{
      foreignKey: 'keyWordThree_id'
    });
    KeyWord.hasMany(models.Offer,{
      foreignKey: 'keyWordOne_id'
    });
    KeyWord.hasMany(models.Offer,{
      foreignKey: 'keyWordTwo_id'
    });
    KeyWord.hasMany(models.Offer,{
      foreignKey: 'keyWordThree_id'
    });
  };
  return KeyWord;
};