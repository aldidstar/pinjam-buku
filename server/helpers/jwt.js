const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.JWT_SECRET

function signToken(data){
    return jwt.sign(data, secret)
}

function decodeToken(data){
    return jwt.decode(data, secret)
}

module.exports = {signToken, decodeToken}