import dotenv from 'dotenv'
dotenv.config()
import { CronJob } from 'cron'
import gameScraper from './games-scraper/index'
import getWishlist from './games-scraper/wishlist'
import Wishlist from './models/Wishlist'
import Game from './models/Game'
import mongoose from 'mongoose'

const scheduleExpression = '*/14 * * * *'

async function updateWishlists() {
  const wishlistData = await getWishlist()
  console.log(wishlistData)
  
  // Drop wishlists collection
  await mongoose.connection.db.dropCollection('wishlists')
    .then(() => console.log('dropped collection!'))
    .catch(error => console.log(error))
  
  // Create new wishlists collection
  await mongoose.connection.db.createCollection('wishlists')
    .then(() => console.log('created new collection!'))
    .catch(error => console.log)
  
  // // Insert data into new wishlists collection
  await Wishlist.insertMany(wishlistData)
    .then(() => console.log('Saved data into collection!'))
    .catch(error => console.log(error))  
}

async function updateGames() {
  const gamesData = await gameScraper()
  console.log(gamesData.length)

    // Drop games collection
  await mongoose.connection.db.dropCollection('games')
    .then(() => console.log('dropped collection!'))
    .catch(error => console.log(error))
  
  // Create new games collection
  await mongoose.connection.db.createCollection('games')
  
  // Insert data into new games collection
  await Game.insertMany(gamesData)
    .then(() => console.log('Saved games data into collection!'))
    .catch(error => console.log(error))  
}

const fetchGamesAndWishlistJob = new CronJob(scheduleExpression, async () => {
  console.log('Job started')
  await updateWishlists()
  await updateGames()
  console.log('Job finished')
}, null, false, 'America/Los_Angeles')

fetchGamesAndWishlistJob.start();