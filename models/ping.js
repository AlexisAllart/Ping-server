'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ping = sequelize.define('Ping', {
    null: DataTypes.BOOLEAN
  }, {});
  Ping.associate = function(models) {
    // associations can be defined here
    Ping.belongsTo(models.Status,{
      foreignKey: 'status_id'
    });
    Ping.belongsTo(models.User,{
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
    Ping.belongsTo(models.CompanyUser,{
      foreignKey: 'companyUser_id',
    });
    Ping.belongsTo(models.Offer,{
      foreignKey: 'offer_id',
      onDelete: 'CASCADE'
    });
    Ping.belongsTo(models.Company,{
      foreignKey: 'company_id',
      onDelete: 'CASCADE'
    });
  };
  return Ping;
};