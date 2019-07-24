'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.FLOAT
      },
      addressNumber: {
        type: Sequelize.STRING
      },
      addressStreet: {
        type: Sequelize.STRING
      },
      addressCity: {
        type: Sequelize.STRING
      },
      addressZIPCode: {
        type: Sequelize.INTEGER
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies',
          key: 'id',
          onDelete: 'CASCADE'
        }
      },
      contractType_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ContractTypes',
          key: 'id'
        }
      },
      companyUser_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CompanyUsers',
          key: 'id'
        }
      },
      keyWordThree_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'KeyWords',
          key: 'id'
        }
      },
      keyWordTwo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'KeyWords',
          key: 'id'
        }
      },
      keyWordOne_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'KeyWords',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Offers');
  }
};