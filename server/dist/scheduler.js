"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cron_1 = require("cron");
const index_js_1 = __importDefault(require("./games-scraper/index.js"));
const wishlist_js_1 = __importDefault(require("./games-scraper/wishlist.js"));
const Wishlist_js_1 = __importDefault(require("./models/Wishlist.js"));
const Game_js_1 = __importDefault(require("./models/Game.js"));
const mongoose_1 = __importDefault(require("mongoose"));
const scheduleExpression = '0 10,18 * * *';
async function updateWishlists() {
    const wishlistData = await (0, wishlist_js_1.default)();
    console.log(wishlistData);
    await mongoose_1.default.connection.db.dropCollection('wishlists')
        .then(() => console.log('dropped collection!'))
        .catch(error => console.log(error));
    await mongoose_1.default.connection.db.createCollection('wishlists')
        .then(() => console.log('created new collection!'))
        .catch(error => console.log);
    await Wishlist_js_1.default.insertMany(wishlistData)
        .then(() => console.log('Saved data into collection!'))
        .catch(error => console.log(error));
}
async function updateGames() {
    const gamesData = await (0, index_js_1.default)();
    console.log(gamesData.length);
    await mongoose_1.default.connection.db.dropCollection('games')
        .then(() => console.log('dropped collection!'))
        .catch(error => console.log(error));
    await mongoose_1.default.connection.db.createCollection('games');
    await Game_js_1.default.insertMany(gamesData)
        .then(() => console.log('Saved games data into collection!'))
        .catch(error => console.log(error));
}
const fetchGamesAndWishlistJob = new cron_1.CronJob(scheduleExpression, async () => {
    console.log('Job started');
    await updateWishlists();
    await updateGames();
    console.log('Job finished');
}, null, false, 'America/Los_Angeles');
fetchGamesAndWishlistJob.start();
//# sourceMappingURL=scheduler.js.map