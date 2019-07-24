'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    name: DataTypes.STRING,
    color: DataTypes.STRING
  }, {});
  Status.associate = function(models) {
    // associations can be defined here
    Status.hasMany(models.Ping,{
      foreignKey: 'status_id'
    })
  };
  return Status;
};