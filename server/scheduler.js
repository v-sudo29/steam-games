import dotenv from 'dotenv'
import { CronJob } from 'cron'
import gameScraper from './games-scraper/index.js'
import getWishlist from './games-scraper/wishlist.js'
import Wishlist from './models/Wishlist.js'
import Game from './models/Game.js'
import mongoose from 'mongoose'

dotenv.config()

// DATABASE
const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

const scheduleExpression = '* * * * *'

async function updateWishlists() {
  const wishlistData = await getWishlist()
  console.log(wishlistData)
  
  // Drop wishlists collection
  await mongoose.connection.db.dropCollection('wishlists', function(err, result) {
    console.log('dropped collection!')
  });
  
  // Create new wishlists collection
  await mongoose.connection.db.createCollection('wishlists')
  
  // // Insert data into new wishlists collection
  await Wishlist.insertMany(...wishlistData)
    .then(() => console.log('Saved data into collection!'))
    .catch(error => console.log(error))  
}

async function updateGames() {
  const gamesData = await gameScraper()
  console.log(gamesData)
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

export default fetchGamesAndWishlistJob