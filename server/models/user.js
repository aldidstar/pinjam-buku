'use strict'
const { Model } = require('sequelize')
const { hashPassword } = require('../helpers/bcrypt')

// Helper function for checking email domain
function isValidEmailDomain(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return emailRegex.test(email)
}

// Helper function for checking password pattern
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
  return passwordRegex.test(password)
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'The email address is already in use!'
        },
        validate: {
          notNull: { msg: 'Email cannot be empty' },
          notEmpty: { msg: 'Email cannot be empty' },

          isValidEmailDomain(value) {
            if (!isValidEmailDomain(value)) {
              throw new Error('Please provide a valid email domain')
            }
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Password cannot be empty' },
          notEmpty: { msg: 'Password cannot be empty' },
          isValidPassword(value) {
            if (!isValidPassword(value)) {
              throw new Error(
                'Password must be 8 characters long, alphanumeric, and contain at least 1 uppercase letter'
              )
            }
          }
        }
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user' // Default role can be 'user'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user) => {
          if (user.password) {
            user.password = hashPassword(user.password)
          }
        }
      }
    }
  )
  User.associate = (models) => {
    User.hasMany(models.Borrowing)
  }
  return User
}
