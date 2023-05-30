require('dotenv').config({ path: '.env' })

// IMPORTS
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(cors())

// DATABASE
const url = process.env.MONGO_URI
mongoose.set('strictQuery', false)
mongoose.connect(url)

const gameSchema = new mongoose.Schema({
  appId: String,
  name: String,
  url: String,
  discount: String,
  currentPrice: String,
  rating: String,
  saleEnds: String,
  saleEndDate: String
})

const Game = mongoose.model('Game', gameSchema)

gameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

// GET REQUESTS
app.get('/', (request, response) => {
  Game.find({})
    .then(items => response.json(items))
    .catch(err => console.log(err))
})

app.listen(3001, function() {
  console.log('Server is running...')
})