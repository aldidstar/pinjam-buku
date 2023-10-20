// BookController.js
const { Book } = require('../models')
const { signToken, decodeToken } = require('../helpers/jwt')

module.exports = {
  createBook: async (req, res, next) => {
    try {
      const payload = req.body
      await Book.create(payload).then(function (book) {
        res.json(book)
      })
    } catch (error) {
      next(error)
    }
  },
  getAll: async (req, res, next) => {
    try {
      const userInfo = decodeToken(req.headers['x-access-token'])
      console.log(userInfo.id)
      await Book.findAll().then(function (book) {
        res.json(book)
      })
      // res.status(200).json(userInfo)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  getBookById: async (req, res, next) => {
    // Add your code for fetching a book by ID here
  }
}
