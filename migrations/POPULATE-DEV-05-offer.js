'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Offers', [{
      title: 'Offre1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      salary: 27000,
      addressNumber: 166,
      addressStreet: 'rue de Bretagne',
      addressCity: 'Lille',
      addressZIPCode: 59000,
      latitude: 50.634227,
      longitude: 3.020457,
      contractType_id: 1,
      companyUser_id: 1,
      keyWordOne_id: 34,
      keyWordTwo_id: 25,
      keyWordThree_id: 12,
      company_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Offre2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      salary: 23000,
      addressNumber: 164,
      addressStreet: 'rue de Bretagne',
      addressCity: 'Lille',
      addressZIPCode: 59000,
      latitude: 50.633981,
      longitude: 3.02301,
      contractType_id: 2,
      companyUser_id: 3,
      keyWordOne_id: 20,
      keyWordTwo_id: 8,
      keyWordThree_id: 1,
      company_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Offre3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      salary: 25000,
      addressNumber: 168,
      addressStreet: 'rue de Bretagne',
      addressCity: 'Lille',
      addressZIPCode: 59000,
      latitude: 50.635425,
      longitude: 3.023032,
      contractType_id: 3,
      companyUser_id: 2,
      keyWordOne_id: 18,
      keyWordTwo_id: 22,
      keyWordThree_id: 9,
      company_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Offre4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      salary: 32000,
      addressNumber: 167,
      addressStreet: 'rue de Bretagne',
      addressCity: 'Lille',
      addressZIPCode: 59000,
      latitude: 50.632435,
      longitude: 3.018708,
      contractType_id: 4,
      companyUser_id: 4,
      keyWordOne_id: 16,
      keyWordTwo_id: 4,
      keyWordThree_id: 6,
      company_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Offre5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      salary: 18000,
      addressNumber: 161,
      addressStreet: 'rue de Bretagne',
      addressCity: 'Lille',
      addressZIPCode: 59000,
      latitude: 50.632135,
      longitude: 3.022678,
      contractType_id: 5,
      companyUser_id: 7,
      keyWordOne_id: 26,
      keyWordTwo_id: 17,
      keyWordThree_id: 2,
      company_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Offre6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      salary: 21000,
      addressNumber: 159,
      addressStreet: 'rue de Bretagne',
      addressCity: 'Lille',
      addressZIPCode: 59000,
      latitude: 50.634424,
      longitude: 3.018515,
      contractType_id: 7,
      companyUser_id: 6,
      keyWordOne_id: 37,
      keyWordTwo_id: 29,
      keyWordThree_id: 6,
      company_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Offre7',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      salary: 24500,
      addressNumber: 170,
      addressStreet: 'rue de Bretagne',
      addressCity: 'Lille',
      addressZIPCode: 59000,
      latitude: 50.633854,
      longitude: 3.025596,
      contractType_id: 8,
      companyUser_id: 8,
      keyWordOne_id: 27,
      keyWordTwo_id: 31,
      keyWordThree_id: 3,
      company_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Offre8',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      salary: 29000,
      addressNumber: 152,
      addressStreet: 'rue de Bretagne',
      addressCity: 'Lille',
      addressZIPCode: 59000,
      latitude: 50.634261,
      longitude: 3.020328,
      contractType_id: 1,
      companyUser_id: 1,
      keyWordOne_id: 16,
      keyWordTwo_id: 24,
      keyWordThree_id: 35,
      company_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Offers', null, {});
  }
};