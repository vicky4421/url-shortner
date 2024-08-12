// imports
const express = require('express')
const urlRoute = require('./routes/url')
const { connectToMongoDB } = require('./connect')

// create app
const app = express()

// connect to db
connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('mongoDB connected!'))
    .catch((error) => console.log(error))

// middleware for json
app.use(express.json())

// define port
const PORT = 8001

// define url
app.use('/url', urlRoute)

// assign port to app
app.listen(PORT, () => console.log(`app started on port: ${PORT}`))