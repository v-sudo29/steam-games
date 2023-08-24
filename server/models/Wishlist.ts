import mongoose from 'mongoose'

const { Schema, model } = mongoose

export interface IWishlist {
  wishlist: boolean,
  appId: string | null,
  name: string,
  reviewsType: string,
  originalPrice: string,
  currentPrice: string,
  discount: string,
  url: string,
  imgUrl: string,
  rating: string | null,
  genres: string[]
}

const wishlistSchema = new Schema<IWishlist>({
  wishlist: Boolean,
  appId: String,
  name: String,
  reviewsType: String,
  originalPrice: String,
  currentPrice: String,
  discount: String,
  url: String,
  imgUrl: String,
  rating: String,
  genres: [String]
})

wishlistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

const Wishlist = model<IWishlist>('Wishlist', wishlistSchema)
export default Wishlist
