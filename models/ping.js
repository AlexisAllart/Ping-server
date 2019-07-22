'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ping = sequelize.define('Ping', {
    null: DataTypes.BOOLEAN
  }, {});
  Ping.associate = function(models) {
    // associations can be defined here
  };
  return Ping;
};