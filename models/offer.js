'use strict';
module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    salary: DataTypes.FLOAT,
    addressNumber: DataTypes.STRING,
    addressStreet: DataTypes.STRING,
    addressCity: DataTypes.STRING,
    addressZIPCode: DataTypes.INTEGER,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {});
  Offer.associate = function(models) {
    // associations can be defined here
    Offer.belongsTo(models.KeyWord,{
      foreignKey: 'keyWordOne_id'
    });
    Offer.belongsTo(models.KeyWord,{
      foreignKey: 'keyWordTwo_id'
    });
    Offer.belongsTo(models.KeyWord,{
      foreignKey: 'keyWordThree_id'
    });
    Offer.belongsTo(models.CompanyUser,{
      foreignKey: 'companyUser_id'
    });
    Offer.belongsTo(models.ContractType,{
      foreignKey: 'contractType_id'
    });
    Offer.belongsTo(models.Company,{
      foreignKey: 'company_id',
      onDelete: 'CASCADE'
    });
    Offer.hasMany(models.Ping,{
      foreignKey: 'offer_id',
      onDelete: 'CASCADE'
    });
  };
  return Offer;
};