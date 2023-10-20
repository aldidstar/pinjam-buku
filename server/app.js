const express = require('express')
const errorHandler = require('./errorHandler')
const cors = require('cors')

require('dotenv').config()
var apiRouter = require('./routes/api')

const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/api', apiRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`App is running on port : ${port}`)
})
