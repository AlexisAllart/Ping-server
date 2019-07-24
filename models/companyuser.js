'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompanyUser = sequelize.define('CompanyUser', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  CompanyUser.associate = function(models) {
    // associations can be defined here
    CompanyUser.belongsTo(models.Company,{
      foreignKey: 'company_id',
      onDelete: 'CASCADE'
    });
    CompanyUser.belongsTo(models.Role,{
      foreignKey: 'role_id'
    });
    CompanyUser.hasMany(models.Offer,{
      foreignKey: 'companyUser_id'
    });
    CompanyUser.hasMany(models.Selection,{
      foreignKey: 'companyUser_id',
    });
    CompanyUser.hasMany(models.Ping,{
      foreignKey: 'companyUser_id',
    });
  };
  return CompanyUser;
};