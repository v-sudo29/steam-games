import mongoose from 'mongoose'

const { Schema, model } = mongoose

export interface IGame {
  appId: string,
  name: string,
  url: string,
  discount: string,
  currentPrice: string,
  originalPrice: string,
  rating: string,
  reviewsType: string,
  imgUrl: string,
  genres: string[],
  saleEnds: string,
  description: string
}

const gameSchema = new Schema<IGame>({
  appId: String,
  name: String,
  url: String,
  discount: String,
  currentPrice: String,
  originalPrice: String,
  rating: String,
  reviewsType: String,
  imgUrl: String,
  genres: [String],
  saleEnds: String,
  description: String
})

gameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

const Game = model<IGame>('Game', gameSchema)
export default Game