'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Offers', [{
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
      companyUser_id: 3,
      status_id: 1,
      company_id: 1,
      offer_id: 2,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 4,
      status_id: 1,
      company_id: 2,
      offer_id: 4,
      user_id: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 4,
      status_id: 1,
      company_id: 2,
      offer_id: 4,
      user_id: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: 4,
      status_id: 1,
      company_id: 2,
      offer_id: 4,
      user_id: 16,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: ,
      status_id: 1,
      company_id: ,
      offer_id: ,
      user_id: ,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: ,
      status_id: 1,
      company_id: ,
      offer_id: ,
      user_id: ,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: ,
      status_id: 1,
      company_id: ,
      offer_id: ,
      user_id: ,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: ,
      status_id: 1,
      company_id: ,
      offer_id: ,
      user_id: ,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: ,
      status_id: 1,
      company_id: ,
      offer_id: ,
      user_id: ,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: ,
      status_id: 1,
      company_id: ,
      offer_id: ,
      user_id: ,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: ,
      status_id: 1,
      company_id: ,
      offer_id: ,
      user_id: ,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: ,
      status_id: 1,
      company_id: ,
      offer_id: ,
      user_id: ,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: ,
      status_id: 1,
      company_id: ,
      offer_id: ,
      user_id: ,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: ,
      status_id: 1,
      company_id: ,
      offer_id: ,
      user_id: ,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: ,
      status_id: 1,
      company_id: ,
      offer_id: ,
      user_id: ,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      companyUser_id: ,
      status_id: 1,
      company_id: ,
      offer_id: ,
      user_id: ,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Offers', null, {});
  }
};
