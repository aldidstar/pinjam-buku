'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Borrowings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      borrowingDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      returnDate: {
        type: Sequelize.DATE
      },
      late: {
        type: Sequelize.BOOLEAN
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      BookId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Books',
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
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Borrowings')
  }
}
