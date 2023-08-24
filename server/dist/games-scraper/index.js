"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_cluster_1 = require("puppeteer-cluster");
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
const WORKERS_COUNT = 2;
const searchResultSelector = 'div.leftcol.large';
const TWO_D_URL = (_a = process.env.TWO_D_URL) !== null && _a !== void 0 ? _a : '';
const BASE_BUILDING_URL = (_b = process.env.BASE_BUILDING_URL) !== null && _b !== void 0 ? _b : '';
const CARD_GAME_URL = (_c = process.env.CARD_GAME_URL) !== null && _c !== void 0 ? _c : '';
const COLONY_SIM_URL = (_d = process.env.COLONY_SIM_URL) !== null && _d !== void 0 ? _d : '';
const CUTE_URL = (_e = process.env.CUTE_URL) !== null && _e !== void 0 ? _e : '';
const INDIE_URL = (_f = process.env.INDIE_URL) !== null && _f !== void 0 ? _f : '';
const FARMING_SIM_URL = (_g = process.env.FARMING_SIM_URL) !== null && _g !== void 0 ? _g : '';
const FARMING_URL = (_h = process.env.FARMING_URL) !== null && _h !== void 0 ? _h : '';
const LIFE_SIM_URL = (_j = process.env.LIFE_SIM_URL) !== null && _j !== void 0 ? _j : '';
const PIXEL_GRAPHICS_URL = (_k = process.env.PIXEL_GRAPHICS_URL) !== null && _k !== void 0 ? _k : '';
const PLATFORMER_URL = (_l = process.env.PLATFORMER_URL) !== null && _l !== void 0 ? _l : '';
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
async function getGames(url, gameType) {
    console.log(`Scraping ${gameType} games!`);
    const browser = await puppeteer_extra_1.default.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load' });
    if (!await page.$(searchResultSelector)) {
        await browser.close();
        console.log('\nselector does not exist\n');
        return [];
    }
    const resultsNum = await page.evaluate(() => {
        var _a, _b, _c;
        const totalResults = !document.querySelector('div.search_results_count')
            ? (_c = (_b = (_a = document.querySelector('#search_results_filtered_warning_persistent')) === null || _a === void 0 ? void 0 : _a.querySelector('div')) === null || _b === void 0 ? void 0 : _b.innerText) !== null && _c !== void 0 ? _c : null
            : document.querySelector('div.search_results_count').innerText;
        if (totalResults) {
            const totalNumber = parseInt(totalResults.split(' ')[0]);
            return totalNumber;
        }
        return 0;
    });
    let totalScrolls = Math.ceil(resultsNum / 14);
    for (let i = 0; i < totalScrolls; i++) {
        if (i === 0)
            await delay(800);
        await page.evaluate(() => window.scrollBy(0, 800));
        await delay(700);
    }
    const gamesArr = [];
    const grabInfo = await page.evaluate(() => {
        const infoArr = [];
        let gameTags;
        if (!document.querySelector('a.search_result_row.ds_collapse_flag.app_impression_tracked')) {
            return [];
        }
        gameTags = document
            .querySelector('#search_resultsRows')
            .querySelectorAll('a.search_result_row.ds_collapse_flag.app_impression_tracked');
        gameTags.forEach(async (game) => {
            var _a, _b, _c, _d;
            const gameName = game.querySelector('span.title').innerText;
            const redirectLink = (_a = game.getAttribute('href')) !== null && _a !== void 0 ? _a : '';
            const discount = game.querySelector('div.discount_pct').innerText;
            const currentPrice = game.querySelector('div.discount_final_price').innerText;
            const originalPrice = game.querySelector('div.discount_original_price').innerText;
            const reviewsType = game.querySelector('span.search_review_summary.positive') ?
                (_c = (_b = game.querySelector('span.search_review_summary.positive')) === null || _b === void 0 ? void 0 : _b.getAttribute('data-tooltip-html')) !== null && _c !== void 0 ? _c : null
                : null;
            const rating = reviewsType === null || reviewsType === void 0 ? void 0 : reviewsType.split('<br>')[1].split(' ')[0];
            const obj = {
                name: gameName,
                url: redirectLink,
                discount: discount,
                currentPrice: currentPrice,
                originalPrice: originalPrice,
                reviewsType: (_d = reviewsType === null || reviewsType === void 0 ? void 0 : reviewsType.split('<br>')[0]) !== null && _d !== void 0 ? _d : '',
                rating: rating
            };
            infoArr.push(obj);
        });
        return infoArr;
    });
    gamesArr.push(...grabInfo);
    await browser.close();
    console.log(gameType, gamesArr.length);
    return gamesArr;
}
async function scrapeSteam(games) {
    console.log('Starting steam games scraping!');
    const cluster = await puppeteer_cluster_1.Cluster.launch({
        concurrency: puppeteer_cluster_1.Cluster.CONCURRENCY_PAGE,
        maxConcurrency: WORKERS_COUNT,
        puppeteerOptions: {
            headless: 'new',
        }
    });
    const gamesArr = games;
    await cluster.task(async ({ page, data: { url, index } }) => {
        var _a;
        if (index === 51)
            console.log('Scraped 50 games');
        if (index === 101)
            console.log('Scraped 100 games');
        if (index === 151)
            console.log('Scraped 150 games');
        if (index === 201)
            console.log('Scraped 200 games');
        if (index === 251)
            console.log('Scraped 250 games');
        if (index === 301)
            console.log('Scraped 300 games');
        if (index === 351)
            console.log('Scraped 350 games');
        if (index === 401)
            console.log('Scraped 400 games');
        if (index === 451)
            console.log('Scraped 450 games');
        if (index === 501)
            console.log('Scraped 500 games');
        if (index === 551)
            console.log('Scraped 550 games');
        if (index === 601)
            console.log('Scraped 600 games');
        if (index === 651)
            console.log('Scraped 650 games');
        await page.goto(`${url}`, { waitUntil: 'load' });
        const birthdaySelectorIsTrue = await page.evaluate(() => document.querySelector('.agegate_birthday_selector') ? true : false);
        const ageGateIsTrue = await page.evaluate(() => document.querySelector('#view_product_page_btn') ? true : false);
        const errorBoxExists = await page.evaluate(() => document.querySelector('#error_box') ? true : false);
        if (errorBoxExists) {
            console.log('Error box exists');
            return;
        }
        else if (birthdaySelectorIsTrue && ageGateIsTrue) {
            await page.select('#ageYear', '1995');
            await page.click('#view_product_page_btn');
            console.log('age barrier exists!');
        }
        await page.waitForSelector('.discount_original_price');
        await page.waitForSelector('div.app_tag.add_button');
        const imgUrl = await page.evaluate(() => document.querySelector('img.game_header_image_full').src);
        await page.click('div.app_tag.add_button');
        await page.waitForSelector('div.newmodal.app_tag_modal_frame');
        const genres = await page.evaluate(() => {
            const genresArr = [];
            const genreTags = document.querySelectorAll('div.app_tag_control.popular a.app_tag');
            genreTags.forEach(tag => {
                genresArr.push(tag.innerText);
            });
            return genresArr;
        });
        const storeUrl = await page.evaluate(() => document.querySelector('meta[property="og:url"]').getAttribute('content'));
        const saleEnds = await page.evaluate(() => document.querySelector('p.game_purchase_discount_countdown')
            .innerText
            .split('Offer ends ')[1]);
        const description = await page.evaluate(() => document.querySelector('meta[property="og:description"]').getAttribute('content'));
        gamesArr[index]['appId'] = (_a = storeUrl === null || storeUrl === void 0 ? void 0 : storeUrl.split('/')[4]) !== null && _a !== void 0 ? _a : '';
        gamesArr[index]['imgUrl'] = imgUrl;
        gamesArr[index]['genres'] = genres;
        gamesArr[index]['url'] = storeUrl !== null && storeUrl !== void 0 ? storeUrl : '';
        gamesArr[index]['saleEnds'] = saleEnds;
        gamesArr[index]['description'] = description !== null && description !== void 0 ? description : '';
    }).catch(err => console.log(err));
    for (let i = 0; i < gamesArr.length; i++) {
        cluster.queue({ url: gamesArr[i]['url'], index: i });
    }
    await cluster.idle();
    await cluster.close();
    return gamesArr;
}
exports.default = async () => {
    const twoDimGames = await getGames(TWO_D_URL, '2D');
    const baseGames = await getGames(BASE_BUILDING_URL, 'Base Building');
    const cardGames = await getGames(CARD_GAME_URL, 'Card Game');
    const colonyGames = await getGames(COLONY_SIM_URL, 'Colony Sim');
    const cuteGames = await getGames(CUTE_URL, 'Cute');
    const indieGames = await getGames(INDIE_URL, 'Indie');
    const farmingSimGames = await getGames(FARMING_SIM_URL, 'Farming Sim');
    const farmingGames = await getGames(FARMING_URL, 'Farming');
    const lifeSimGames = await getGames(LIFE_SIM_URL, 'Life Sim');
    const pixelGames = await getGames(PIXEL_GRAPHICS_URL, 'Pixel Graphics');
    const platformerGames = await getGames(PLATFORMER_URL, 'Platformer');
    const games = [
        ...twoDimGames,
        ...baseGames,
        ...cardGames,
        ...colonyGames,
        ...cuteGames,
        ...indieGames,
        ...farmingSimGames,
        ...farmingGames,
        ...lifeSimGames,
        ...pixelGames,
        ...platformerGames
    ];
    const names = games.map(({ name }) => name);
    const filtered = games.filter(({ name }, index) => !names.includes(name, index + 1));
    console.log('filtered: ', filtered.length);
    const steamGames = await scrapeSteam(filtered);
    const filteredGames = steamGames.filter(game => Object.keys(game).length === 12);
    console.log('filtered games have all properties: ', filteredGames.length);
    return filteredGames;
};
//# sourceMappingURL=index.js.map