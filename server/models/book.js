// Book Model
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Book extends Model {}

  Book.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { sequelize, modelName: 'Book' }
  )

  Book.associate = (models) => {
    Book.hasMany(models.Borrowing)
  }

  return Book
}
