'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Pings', [{
      companyUser_id: 1,
      status_id: 1,
      company_id: 1,
      offer_id: 1,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 1,
      status_id: 1,
      company_id: 1,
      offer_id: 1,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 1,
      status_id: 1,
      company_id: 1,
      offer_id: 1,
      user_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 1,
      status_id: 1,
      company_id: 1,
      offer_id: 1,
      user_id: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 2,
      status_id: 1,
      company_id: 2,
      offer_id: 2,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 4,
      status_id: 1,
      company_id: 4,
      offer_id: 4,
      user_id: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 4,
      status_id: 1,
      company_id: 4,
      offer_id: 4,
      user_id: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 4,
      status_id: 1,
      company_id: 4,
      offer_id: 4,
      user_id: 16,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 5,
      status_id: 1,
      company_id: 5,
      offer_id: 5,
      user_id: 17,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 6,
      status_id: 1,
      company_id: 6,
      offer_id: 6,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 6,
      status_id: 1,
      company_id: 6,
      offer_id: 6,
      user_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 6,
      status_id: 1,
      company_id: 6,
      offer_id: 6,
      user_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 6,
      status_id: 1,
      company_id: 6,
      offer_id: 6,
      user_id: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 6,
      status_id: 1,
      company_id: 6,
      offer_id: 6,
      user_id: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 6,
      status_id: 1,
      company_id: 6,
      offer_id: 6,
      user_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 6,
      status_id: 1,
      company_id: 6,
      offer_id: 6,
      user_id: 15,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 6,
      status_id: 1,
      company_id: 6,
      offer_id: 6,
      user_id: 17,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 4,
      status_id: 1,
      company_id: 4,
      offer_id: 4,
      user_id: 18,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 2,
      status_id: 1,
      company_id: 2,
      offer_id: 2,
      user_id: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 5,
      status_id: 1,
      company_id: 5,
      offer_id: 5,
      user_id: 19,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Pings', null, {});
  }
};
