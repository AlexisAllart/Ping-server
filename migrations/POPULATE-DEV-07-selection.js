'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Selections', [{
      companyUser_id: 2,
      tag_id: 1,
      company_id: 1,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 2,
      tag_id: 1,
      company_id: 1,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 2,
      tag_id: 1,
      company_id: 1,
      user_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 2,
      tag_id: 1,
      company_id: 1,
      user_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 2,
      tag_id: 1,
      company_id: 1,
      user_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 2,
      tag_id: 1,
      company_id: 1,
      user_id: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 2,
      tag_id: 1,
      company_id: 1,
      user_id: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 2,
      tag_id: 1,
      company_id: 1,
      user_id: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 1,
      tag_id: 1,
      company_id: 1,
      user_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 2,
      tag_id: 1,
      company_id: 1,
      user_id: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 4,
      tag_id: 1,
      company_id: 2,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 5,
      tag_id: 1,
      company_id: 2,
      user_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 5,
      tag_id: 1,
      company_id: 2,
      user_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 6,
      tag_id: 1,
      company_id: 2,
      user_id: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 7,
      tag_id: 1,
      company_id: 3,
      user_id: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 8,
      tag_id: 1,
      company_id: 3,
      user_id: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { 
      companyUser_id: 9,
      tag_id: 1,
      company_id: 3,
      user_id: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Selections', null, {});
  }
};
