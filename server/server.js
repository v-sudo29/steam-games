require('dotenv').config()

// IMPORTS
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Game = require('./models/Game')
const Wishlist = require('./models/Wishlist')
const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(cors())

// DATABASE
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

// START SCHEDULER
require('./scheduler.js')

// GET REQUESTS
app.get('/all-games', (request, response) => {
  Game.find({})
    .then(items => response.json(items))
    .catch(err => console.log(err))
})

app.get('/wishlist', (request, response) => {
  Wishlist.find({})
    .then(items => response.json(items))
    .catch(err => console.log(err))
})

app.get('/search', (req, res) => {
  const gameName = req.query.q

  Game.find({ 'name': { $regex: gameName, $options: 'i' } })
    .then(games => res.json(games))
    .catch(err => console.log(err))
})

app.listen(3001, function() {
  console.log('Server is running...')
})