'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ContractTypes', [{
      name: "CDI",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "CDD",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "CTT",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Alternance",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Intermittent",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Temps partiel",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "CUI - CAE",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "CUI - CIE",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ContractTypes', null, {});
  }
};