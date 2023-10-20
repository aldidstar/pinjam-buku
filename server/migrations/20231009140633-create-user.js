'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
            isValidEmailDomain(value) {
              if (
                !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
              ) {
                throw new Error('Please provide a valid email domain')
              }
            }
          }
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isAlphanumeric: true,
            isLongEnough(value) {
              if (value.length < 8) {
                throw new Error('Password must be at least 8 characters long')
              }
            },
            hasUppercase(value) {
              if (value.toLowerCase() === value) {
                throw new Error(
                  'Password must contain at least one uppercase letter'
                )
              }
            },
            hasNoSpecialChar(value) {
              if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                throw new Error('Password cannot contain special characters')
              }
            }
          }
        },
        role: {
          type: Sequelize.STRING,
          defaultValue: 'user'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        timestamps: true
      }
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
}
