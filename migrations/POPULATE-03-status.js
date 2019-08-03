'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Statuses', [{
      name: 'En attente',
      color: '#08B3FF',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Refusé',
      color: '#EF3F3F',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Accepté',
      color: '#3FEF4C',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Statuses', null, {});
  }
};