// BorrowingController.js
const { Borrowing, User, Book } = require('../models')
const { signToken, decodeToken } = require('../helpers/jwt')

module.exports = {
  createBorrowing: async (req, res, next) => {
    try {
      const { BookId } = req.body
      const userInfo = decodeToken(req.headers['x-access-token'])

      // Check if the user already has a borrowing and if the return date is not null
      const existingBorrowing = await Borrowing.findOne({
        where: { UserId: userInfo.id, returnDate: null }
      })

      if (existingBorrowing) {
        return res.status(400).json({
          message: 'Kembalikan buku yang telah dipinjam sebelumnya'
        })
      }

      // Create the new borrowing record
      const borrowing = await Borrowing.create({
        UserId: userInfo.id,
        BookId,
        borrowingDate: new Date(),
        late: false
      })

      res
        .status(201)
        .json({ message: 'Borrowing recorded successfully', borrowing })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },
  getBorrowingById: async (req, res, next) => {
    try {
      const { borrowingId } = req.params
      // Add code here to find the borrowing record by ID
      const borrowing = await Borrowing.findByPk(borrowingId, {
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'email'] // Specify the attributes you want to include
          },
          {
            model: Book,
            attributes: ['id', 'name', 'author'] // Specify the attributes you want to include
          }
        ]
      })

      if (!borrowing) {
        return res.status(404).json({ message: 'Pengembalian tidak ditemukan' })
      }

      const returnDate = borrowing.returnDate
        ? new Date(borrowing.returnDate)
        : new Date()
      const deadlineReturn = new Date(
        borrowing.borrowingDate.setDate(borrowing.borrowingDate.getDate() + 1)
      )
      let isLate = false

      if (returnDate > deadlineReturn) {
        isLate = true
      }

      res.status(200).json({ borrowing, isLate })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },
  getBorrowing: async (req, res, next) => {
    try {
      // Add code here to find all borrowing records and include the User and Book models
      const borrowings = await Borrowing.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'email'] // Specify the attributes you want to include
          },
          {
            model: Book,
            attributes: ['id', 'name', 'author'] // Specify the attributes you want to include
          }
        ]
      })

      if (!borrowings || borrowings.length === 0) {
        return res.status(404).json({ message: 'Borrowings not found' })
      }

      // const currentDate = new Date()

      const borrowingData = borrowings.map((borrowing) => {
        const returnDate = borrowing.returnDate
          ? new Date(borrowing.returnDate)
          : new Date()
        const deadlineReturn = new Date(
          borrowing.borrowingDate.setDate(borrowing.borrowingDate.getDate() + 1)
        )
        let isLate = false

        if (returnDate > deadlineReturn) {
          isLate = true
        }

        return { borrowing, isLate }
      })

      res.status(200).json({ borrowingData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },
  // BorrowingController.js

  updateReturnDate: async (req, res, next) => {
    try {
      const { borrowingId } = req.params

      // Find the borrowing record by ID
      const borrowing = await Borrowing.findOne({
        where: { BookId: borrowingId, returnDate: null }
      })

      if (!borrowing) {
        return res.status(404).json({ message: 'Pengembalian tidak ditemukan' })
      }

      // Update the returnDate with the current date
      borrowing.returnDate = new Date()
      await borrowing.save()

      res
        .status(200)
        .json({ message: 'Return date updated successfully', borrowing })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
