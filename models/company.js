'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    link: DataTypes.STRING,
    logo: DataTypes.STRING,
    about: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
    Company.hasMany(models.Selection,{
      foreignKey: 'company_id',
      onDelete: 'CASCADE'
    });
    Company.hasMany(models.CompanyUser,{
      foreignKey: 'company_id',
      onDelete: 'CASCADE'
    });
    Company.hasMany(models.Ping,{
      foreignKey: 'company_id',
      onDelete: 'CASCADE'
    });
    Company.hasMany(models.Offer,{
      foreignKey: 'company_id',
      onDelete: 'CASCADE'
    });
  };
  return Company;
};