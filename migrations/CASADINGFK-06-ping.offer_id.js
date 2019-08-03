'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Pings',
      'offer_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Offers',
          key: 'id'
        },
        onDelete: 'CASCADE',
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Pings',
      'offer_id'
    );
  }
};