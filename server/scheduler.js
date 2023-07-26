require('dotenv').config();

// IMPORTS
import wishlistScraper from './games-scraper/wishlist.js';
import gameScraper from './games-scraper/index.js'

const { CronJob } = require('cron')
const Game = require('./models/Game')
const Wishlist = require('./models/Wishlist')
const mongoose = require('mongoose')

// DATABASE
const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

const scheduleExpression = '31 * * * *'

async function updateWishlists() {
  const wishlistData = await wishlistScraper.run()
  
  // Drop wishlists collection
  await mongoose.connection.db.dropCollection('wishlists', function(err, result) {
    console.log('dropped collection!')
  });
  
  // Create new wishlists collection
  await mongoose.connection.db.createCollection('wishlists')
  
  // Insert data into new wishlists collection
  await Wishlist.insertMany(wishlistData)
    .then(() => console.log('Saved data into collection!'))
    .catch(error => console.log(error))  
}

async function updateGames() {
  const gamesData = await gameScraper.run()

    // Drop games collection
  await mongoose.connection.db.dropCollection('games', function(err, result) {
    console.log('dropped collection!')
  });
  
  // Create new games collection
  await mongoose.connection.db.createCollection('games')
  
  // Insert data into new games collection
  await Game.insertMany(gamesData)
    .then(() => console.log('Saved games data into collection!'))
    .catch(error => console.log(error))  
}

console.log('Scheduler started')
const fetchGamesAndWishlistJob = new CronJob(scheduleExpression, async () => {
  console.log('Job started')
  await mongoose.connect(url)
  await updateWishlists()
  await updateGames()
  await mongoose.connection.close()
  console.log('Job finished')
})

fetchGamesAndWishlistJob.start();