const bcrypt = require('bcryptjs')
let salt = bcrypt.genSaltSync(8)

function hashPassword(password) {
  console.log('masuk sini')
  return bcrypt.hashSync(password, salt)
}

function checkPassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

module.exports = { hashPassword, checkPassword }
