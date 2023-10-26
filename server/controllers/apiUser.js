// const User = require('../models/user')
const secretKey = process.env.SECRET_KEY
var jwt = require('jsonwebtoken')
const { User } = require('../models')
const { checkPassword, hashPassword } = require('../helpers/bcrypt')
const { signToken, decodeToken } = require('../helpers/jwt')
require('dotenv').config()

module.exports = {
  userRead: async (req, res, next) => {
    try {
      const userInfo = decodeToken(req.headers.token)
      res.status(200).json(userInfo)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  getAll: async (req, res, next) => {
    try {
      await User.findAll().then(function (movie) {
        res.json(movie)
      })
      // res.status(200).json(userInfo)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  getDetail: async (req, res, next) => {
    try {
      await User.findOne({
        where: {
          id: req.params.id
        }
      }).then(function (users) {
        res.json(users)
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  create: async (req, res, next) => {
    try {
      const payload = req.body
      await User.create(payload).then(function (movie) {
        res.json(movie)
      })
    } catch (error) {
      next(error)
    }
  },
  delete: async (req, res, next) => {
    try {
      await User.destroy({
        where: {
          id: req.params.id
        }
      }).then(function (movie) {
        res.json(movie)
      })
    } catch (error) {
      next(error)
    }
  },
  update: async (req, res, next) => {
    try {
      // Define the data you want to update
      const updatedData = req.body

      // Use the 'update' method to update the data
      const [rowsUpdated, updatedRows] = await User.update(updatedData, {
        where: {
          id: req.params.id
        },
        returning: true
      })

      if (rowsUpdated === 0) {
        return res.status(404).json({ message: 'Movie not found' })
      }

      res.json(updatedRows[0])
    } catch (error) {
      next(error)
    }
  },

  userLogin: async (req, res, next) => {
    try {
      if (!req.body.email || !req.body.password)
        throw { name: 'EmailPasswordMissing' }

      const user = await User.findOne({ where: { email: req.body.email } })
      if (!user) throw { name: 'InvalidCredentials' }
      req.body.id = user.dataValues.id

      const isPasswordValid = checkPassword(req.body.password, user.password)
      if (!isPasswordValid) throw { name: 'InvalidCredentials' }

      let { dataValues } = user
      const generatedToken = signToken({
        id: dataValues.id,
        name: dataValues.name,
        email: dataValues.email,
        role: dataValues.role
      })

      res.status(200).json({
        message: 'Login success',
        token: generatedToken,
        role: dataValues.role
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  },

  userRegister: async (req, res, next) => {
    try {
      const payload = req.body
      const createdUser = await User.create(payload)
      const generatedToken = signToken({
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role
      })
      res.status(201).json({
        message: `User with email ${payload.email} is created`,
        token: generatedToken
      })
    } catch (error) {
      next(error)
    }
  }
}
