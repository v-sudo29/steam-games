import dotenv from 'dotenv'
dotenv.config()

// IMPORTS
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Game from './models/Game.js'
import Wishlist from './models/Wishlist.js'
const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(cors())

// DATABASE
const url = process.env.MONGODB_URI

if (!url) throw  new Error('MONGODB_URI environment variable is not defined')

mongoose.set('strictQuery', false)
mongoose.connect(url)

// START SCHEDULER
require('./scheduler.ts')

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