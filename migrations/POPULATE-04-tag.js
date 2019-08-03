'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tags', [{
      name: 'Nouveau',
      color: '#08B3FF',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Ecarté',
      color: '#EF3F3F',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Ajouté',
      color: '#3FEF4C',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};