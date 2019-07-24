'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContractType = sequelize.define('ContractType', {
    name: DataTypes.STRING
  }, {});
  ContractType.associate = function(models) {
    // associations can be defined here
    ContractType.hasMany(models.Offer,{
      foreignKey: 'contractType_id'
    });
  };
  return ContractType;
};