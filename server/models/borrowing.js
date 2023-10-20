// Borrowing Model
const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Borrowing extends Model {}

  Borrowing.init(
    {
      borrowingDate: DataTypes.DATE,
      returnDate: DataTypes.DATE,
      late: DataTypes.BOOLEAN
    },
    { sequelize, modelName: 'Borrowing' }
  )

  Borrowing.associate = (models) => {
    Borrowing.belongsTo(models.User)
    Borrowing.belongsTo(models.Book)
  }

  return Borrowing
}
