const mongoose = require('mongoose')

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

wishlistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Wishlist', wishlistSchema)
