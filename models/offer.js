'use strict';
module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    contractType: DataTypes.STRING,
    salary: DataTypes.FLOAT,
    addressNumber: DataTypes.STRING,
    addressStree: DataTypes.STRING,
    adressCity: DataTypes.STRING,
    addressZIPCode: DataTypes.INTEGER,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {});
  Offer.associate = function(models) {
    // associations can be defined here
  };
  return Offer;
};