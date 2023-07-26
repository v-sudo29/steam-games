import mongoose from "mongoose"

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

gameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

const Game = mongoose.model('Game', gameSchema)

export default Game