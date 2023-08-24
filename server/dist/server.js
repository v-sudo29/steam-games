"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Game_js_1 = __importDefault(require("./models/Game.js"));
const Wishlist_js_1 = __importDefault(require("./models/Wishlist.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const url = process.env.MONGODB_URI;
if (!url)
    throw new Error('MONGODB_URI environment variable is not defined');
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(url);
require('./scheduler.js');
app.get('/all-games', (request, response) => {
    Game_js_1.default.find({})
        .then(items => response.json(items))
        .catch(err => console.log(err));
});
app.get('/wishlist', (request, response) => {
    Wishlist_js_1.default.find({})
        .then(items => response.json(items))
        .catch(err => console.log(err));
});
app.get('/search', (req, res) => {
    const gameName = req.query.q;
    Game_js_1.default.find({ 'name': { $regex: gameName, $options: 'i' } })
        .then(games => res.json(games))
        .catch(err => console.log(err));
});
app.listen(3001, function () {
    console.log('Server is running...');
});
//# sourceMappingURL=server.js.map