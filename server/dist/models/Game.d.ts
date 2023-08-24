import mongoose from 'mongoose';
export interface IGame {
    appId: string;
    name: string;
    url: string;
    discount: string;
    currentPrice: string;
    originalPrice: string;
    rating: string;
    reviewsType: string;
    imgUrl: string;
    genres: string[];
    saleEnds: string;
    description: string;
}
declare const Game: mongoose.Model<IGame, {}, {}, {}, mongoose.Document<unknown, {}, IGame> & IGame & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default Game;
