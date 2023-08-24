import mongoose from 'mongoose';
export interface IWishlist {
    wishlist: boolean;
    appId: string | null;
    name: string;
    reviewsType: string;
    originalPrice: string;
    currentPrice: string;
    discount: string;
    url: string;
    imgUrl: string;
    rating: string | null;
    genres: string[];
}
declare const Wishlist: mongoose.Model<IWishlist, {}, {}, {}, mongoose.Document<unknown, {}, IWishlist> & IWishlist & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default Wishlist;
