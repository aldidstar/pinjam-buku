var express = require('express')
var router = express.Router()

const apiUser = require('../controllers/apiUser')
const apiBook = require('../controllers/apiBook')
const apiBorrowing = require('../controllers/apiBorrowing')
const helpers = require('../helpers/utils')

// API User

router.post('/login', apiUser.userLogin)
router.post('/register', apiUser.userRegister)
router.get('/me', apiUser.userRead)
router.get('/Movies', apiUser.getAll)
router.get('/Movies/:id', apiUser.getDetail)
router.post('/Movies', apiUser.create)
router.delete('/Movies/:id', apiUser.delete)
router.patch('/Movies/:id', apiUser.update)

// API Book
router.post('/book', helpers.verifyToken, apiBook.createBook)
router.get('/book', helpers.verifyToken, apiBook.getAll)

// API Borrowing
router.post('/borrow', apiBorrowing.createBorrowing)
router.get('/borrow/:borrowingId', apiBorrowing.getBorrowingById)
router.get('/borrow', apiBorrowing.getBorrowing)
router.post('/return/:borrowingId', apiBorrowing.updateReturnDate)

module.exports = router
