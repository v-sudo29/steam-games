require('dotenv').config()

// IMPORTS
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(cors())

// DATABASE
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const gameSchema = new mongoose.Schema({
  appId: String,
  name: String,
  url: String,
  discount: String,
  currentPrice: String,
  originalPrice: String,
  rating: String,
  reviewsType: String,
  historicalLow: Boolean,
  imgUrl: String,
  genres: Array,
  saleEnds: String,
})

const wishlistSchema = new mongoose.Schema({
  wishlist: Boolean,
  appId: String,
  name: String,
  reviewsType: String,
  originalPrice: String,
  currentPrice: String,
  discount: String,
  url: String,
  imgUrl: String
})

gameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

wishlistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

const Game = mongoose.model('Game', gameSchema)
const Wishlist = mongoose.model('Wishlist', wishlistSchema)

// GET REQUESTS
app.get('/', (request, response) => {
  Game.find({})
    .then(items => response.json(items))
    .catch(err => console.log(err))
})

app.get('/wishlist', (request, response) => {
  Wishlist.find({})
  .then(items => response.json(items))
  .catch(err => console.log(err))
})

app.listen(3001, function() {
  console.log('Server is running...')
})