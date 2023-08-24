"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
const wishlist_url = process.env.WISHLIST_URL;
const wishlistSelector = 'div.discount_pct';
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
let gamesArr = [];
exports.default = async () => {
    const browser = await puppeteer_extra_1.default.launch({
        headless: 'new',
        'args': [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.goto(`${wishlist_url}`, { waitUntil: 'load' });
    await page.waitForSelector(wishlistSelector);
    for (let i = 0; i < 3; i++) {
        await page.evaluate(() => window.scrollBy(0, 700));
        await delay(800);
    }
    const discountedGames = await page.evaluate(() => {
        gamesArr = [];
        const gameTags = document.querySelectorAll('.wishlist_row');
        gameTags.forEach(tag => {
            var _a, _b;
            const discountIsTrue = tag.querySelector('div.discount_pct') ? true : false;
            const reviewsTypeIsMixed = ((_a = tag.querySelector('div.value.game_review_summary')) === null || _a === void 0 ? void 0 : _a.classList.contains('mixed')) ? true : false;
            if (discountIsTrue && !reviewsTypeIsMixed) {
                const appId = tag.dataset.appId;
                const gameName = tag.querySelector('a.title').innerText;
                const reviewsType = tag.querySelector('div.value.game_review_summary').innerText;
                const originalPrice = tag.querySelector('div.discount_original_price').innerText;
                const currentPrice = tag.querySelector('div.discount_final_price').innerText;
                const discount = tag.querySelector('div.discount_pct').innerText;
                const url = tag.querySelector('a.title').href;
                const imgUrl = tag.querySelector('a.capsule img').src;
                const rating = tag.querySelector('div.value.game_review_summary').dataset.tooltipText;
                const genreTags = tag.querySelectorAll('.tag');
                const genresArr = [];
                genreTags.forEach(element => genresArr.push(element.innerText));
                gamesArr.push({
                    wishlist: true,
                    appId: appId ? appId : null,
                    name: gameName,
                    reviewsType: reviewsType,
                    originalPrice: originalPrice,
                    currentPrice: currentPrice,
                    discount: discount,
                    url: url,
                    imgUrl: imgUrl,
                    rating: (_b = rating === null || rating === void 0 ? void 0 : rating.split(' ')[0]) !== null && _b !== void 0 ? _b : null,
                    genres: [...genresArr]
                });
            }
        });
        return gamesArr;
    });
    await browser.close();
    return discountedGames;
};
//# sourceMappingURL=wishlist.js.map