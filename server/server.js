import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import fetchGamesAndWishlistJob from './scheduler.js'

dotenv.config()

// START SCHEDULER
fetchGamesAndWishlistJob.start()

// IMPORTS
// const Game = require('./models/Game')
// const Wishlist = require('./models/Wishlist')
// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')
const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(cors())

// DATABASE
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

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