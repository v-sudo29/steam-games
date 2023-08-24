"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const wishlistSchema = new Schema({
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
});
wishlistSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    }
});
const Wishlist = model('Wishlist', wishlistSchema);
exports.default = Wishlist;
//# sourceMappingURL=Wishlist.js.map