'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('CompanyUsers', [{
      name: 'Geraldine Kouma',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'geraldine.kouma@gmail.com',
      role_id: '1',
      company_id: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Melvin Salter',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'melvin.salter@gmail.com',
      role_id: '2',
      company_id: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Skye Stark',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'skye.stark@gmail.com',
      role_id: '2',
      company_id: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Denzel Head',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'denzel.head@gmail.com',
      role_id: '1',
      company_id: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Maha Rawlings',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'maha.rawlings@gmail.com',
      role_id: '2',
      company_id: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Harri Cain',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'harri.cain@gmail.com',
      role_id: '2',
      company_id: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Lana Steele',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'lana.steele@gmail.com',
      role_id: '1',
      company_id: '3',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Sayed Mendoza',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'sayed.mendoza@gmail.com',
      role_id: '2',
      company_id: '3',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Daisy Villegas',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'daisy.villegas@gmail.com',
      role_id: '2',
      company_id: '3',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('CompanyUsers', null, {});
  }
};