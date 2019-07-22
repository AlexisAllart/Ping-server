'use strict';
module.exports = (sequelize, DataTypes) => {
  const Selection = sequelize.define('Selection', {
    null: DataTypes.BOOLEAN
  }, {});
  Selection.associate = function(models) {
    // associations can be defined here
  };
  return Selection;
};