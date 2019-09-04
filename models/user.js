'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        lastName: DataTypes.STRING,
        firstName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        picture: DataTypes.STRING,
        cv: DataTypes.STRING,
        about: DataTypes.STRING,
        facebook: DataTypes.STRING,
        twitter: DataTypes.STRING,
        linkedin: DataTypes.STRING,
        available: DataTypes.BOOLEAN
    }, {});
    User.associate = function(models) {
        // associations can be defined here
        User.belongsTo(models.KeyWord, {
            foreignKey: 'keyWordOne_id',
            as: 'KeyWordOne'
        });
        User.belongsTo(models.KeyWord, {
            foreignKey: 'keyWordTwo_id',
            as: 'KeyWordTwo'
        });
        User.belongsTo(models.KeyWord, {
            foreignKey: 'keyWordThree_id',
            as: 'KeyWordThree'
        });
        User.hasMany(models.Ping, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });
        User.hasMany(models.Selection, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });
    };
    return User;
};