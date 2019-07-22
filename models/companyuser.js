'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompanyUser = sequelize.define('CompanyUser', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  CompanyUser.associate = function(models) {
    // associations can be defined here
  };
  return CompanyUser;
};