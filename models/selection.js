'use strict';
module.exports = (sequelize, DataTypes) => {
  const Selection = sequelize.define('Selection', {
    null: DataTypes.BOOLEAN
  }, {});
  Selection.associate = function(models) {
    // associations can be defined here
    Selection.belongsTo(models.Tag,{
      foreignKey: 'tag_id'
    });
    Selection.belongsTo(models.User,{
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
    Selection.belongsTo(models.Company,{
      foreignKey: 'company_id',
      onDelete: 'CASCADE'
    });
    Selection.belongsTo(models.CompanyUser,{
      foreignKey: 'companyUser_id',
    });
  };
  return Selection;
};