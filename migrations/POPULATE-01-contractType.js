'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ContractTypes', [{
      name: "CDI (Contrat à Durée Indéterminée)",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "CDD (Contrat à Durée Déterminée)",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "CTT (Contrat de Travail Temporaire - Intérim)",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Contrat d'apprentissage (Alternance)",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Contrat de professionnalisation (Alternance)",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Contrat de travail intermittent",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Contrat à temps partiel",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "CUI - CAE (Contrat Unique d'Insertion - Contrat d'Accompagnement dans l'Emploi)",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "CUI - CIE (Contrat Unique d'Insertion - Contrat Initiative Emploi)",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ContractTypes', null, {});
  }
};