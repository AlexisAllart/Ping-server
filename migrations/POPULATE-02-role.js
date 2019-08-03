'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      name: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};