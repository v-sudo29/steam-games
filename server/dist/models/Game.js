"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const gameSchema = new Schema({
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
});
gameSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    }
});
const Game = model('Game', gameSchema);
exports.default = Game;
//# sourceMappingURL=Game.js.map