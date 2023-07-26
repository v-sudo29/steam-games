require('dotenv').config()

const puppeteer = require('puppeteer-extra')
const { Cluster } = require('puppeteer-cluster')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());
// const fs = require('fs');

// Today's date
let todaySplitted = (new Date).toString().split(' ')
const month = todaySplitted[1]
const day = todaySplitted[2]

const DATE = `${month}-${day}`
const WORKERS_COUNT = 2
const OVERWHELMINGLY_POSITIVE_URL = process.env.OVERWHELMINGLY_POSITIVE_URL
const VERY_POSITIVE_URL = process.env.VERY_POSITIVE_URL
const POSITIVE_URL = process.env.POSITIVE_URL
const MOSTLY_POSITIVE_URL = process.env.MOSTLY_POSITIVE_URL
const searchResultSelector = 'div.hoverable-box';

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async function getGames(url, reviewsType) {
  const browser = await puppeteer.launch({ 
    headless: true, 
    'args' : [
    '--no-sandbox',
    '--disable-setuid-sandbox'
    ],
    ignoreHTTPSErrors: true,
    executablePath: `/path/to/Chrome`
  })

  const page = await browser.newPage()

  await page.goto(url, {waitUntil: 'load'})
  if (!await page.$(searchResultSelector)) {
    await browser.close()
    console.log('\nselector does not exist\n')
    return []
  }

  // Grab total pages number
  const totalPages = await page.evaluate(() => {
    const totalEntries = parseInt(document.querySelector('span.after-page-size-label') === null ? 
      1 : document.querySelector('span.after-page-size-label').innerText.split(' ')[1])
    const entriesPerPage = parseInt(document.querySelector('div.d-flex.flex-wrap.navigation-line-left span.value') === null ? 
      1 : document.querySelector('div.d-flex.flex-wrap.navigation-line-left span.value').innerText)
    const totalPages = (totalEntries === 0 && entriesPerPage === 0) ? 0 : Math.ceil(totalEntries/entriesPerPage)

    return totalPages
  })

  const gamesArr = []
  let i = 1

  // Get OVERWHELMINGLY POSITIVE games info 
  while (i <= totalPages) {

    // Grab info on page
    const grabInfo = await page.evaluate((reviewsType) => {
      const infoArr = []
      const gameTags = document
        .querySelector('div.d-flex.flex-wrap.relative.list-items.shadow-box-small-lighter')
        .querySelectorAll('div.hoverable-box')
  
      gameTags.forEach(async (game) => {
        const gameName = game.querySelector('button.game-options-trigger-btn').getAttribute('data-game-title')
        const redirectLink = 'https://gg.deals' + game.querySelector('a.shop-link').getAttribute('href')
        const discount = game.querySelector('span.discount.label').innerText
        const currentPrice = game.querySelector('span.price-inner.game-price-new').innerText
        const originalPrice = game.querySelector('span.price-label.price-old').innerText
        const historicalLow = game.querySelector('span.historical.label') === null ? false : true

        const obj = {
          name: gameName,
          url: redirectLink,
          discount: discount,
          currentPrice: currentPrice,
          originalPrice: originalPrice,
          reviewsType: reviewsType,
          historicalLow: historicalLow,
        }
        infoArr.push(obj)
      })
      return infoArr
    }, reviewsType)

    // Push games info into gamesArr
    gamesArr.push(...grabInfo)

    // Go to next page or break from loop if no pages
    if (totalPages === 1) break
    i++
    await page.goto(url + `&page=${i}`)
  }

  await browser.close()
  return gamesArr
}

async function scrapeSteam(games) {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: WORKERS_COUNT,
    puppeteerOptions: {
      headless: 'new',
      executablePath: `/path/to/Chrome`
    }
  })
  const gamesArr = games
  const testArr = []

  await cluster.task(async ({ page, data: {url, index} }) => {

    // Go to detail page
    await page.goto(`${url}`,{ waitUntil: 'load' })
    const birthdaySelectorIsTrue = await page.evaluate(() => document.querySelector('.agegate_birthday_selector') ? true : false)
    const ageGateIsTrue = await page.evaluate(() => document.querySelector('#view_product_page_btn') ? true : false)
    const errorBoxExists = await page.evaluate(() => document.querySelector('#error_box') ? true : false)

    // Check if age gate exists
    if (errorBoxExists) {
      console.log('Error box exists')
      return
    }
    else if (birthdaySelectorIsTrue && ageGateIsTrue) {
      await page.select('#ageYear', '1995')
      await page.click('#view_product_page_btn')
      console.log('age barrier exists!')
    } 

    // Wait for selectors
    await page.waitForSelector('.discount_original_price')
    await page.waitForSelector('div.app_tag.add_button')

    // Scrape original img url
    const imgUrl = await page.evaluate(() => document.querySelector('img.game_header_image_full').src)

    // Scrape end date
    const saleEnds = await page.evaluate(() => document.querySelector('p.game_purchase_discount_countdown').innerText
      .split('Offer ends ')[1])

    // Scrape rating
    const rating = await page.evaluate(() => document.querySelector('div.summary_section span.game_review_summary').getAttribute('data-tooltip-html').split(' ')[0])

    // Scrape genres
    await page.click('div.app_tag.add_button')
    await page.waitForSelector('div.newmodal.app_tag_modal_frame')

    const genres = await page.evaluate(() => {
      const genresArr = []
      const genreTags = document.querySelectorAll('div.app_tag_control.popular a.app_tag')
      genreTags.forEach(tag => {
        genresArr.push(tag.innerText)
      })
      return genresArr
    })
    
    // Scrape steam store game page url
    const storeUrl = await page.evaluate(() => document.querySelector('meta[property="og:url"]').getAttribute('content'))

    // Append info
    gamesArr[index]['appId'] = storeUrl.split('/')[4]
    gamesArr[index]['imgUrl'] = imgUrl
    gamesArr[index]['genres'] = genres
    gamesArr[index]['url'] = storeUrl
    gamesArr[index]['saleEnds'] = saleEnds
    gamesArr[index]['rating'] = rating
    
    i++
  }).catch(err => console.log(err))

  for (let i = 0; i < 5; i++) {
    cluster.queue({url: gamesArr[i]['url'], index: i})
  }
  await cluster.idle()
  await cluster.close()

  return gamesArr
}

module.exports = async () => {
  console.time('time')
  const OPgames = await getGames(`${OVERWHELMINGLY_POSITIVE_URL}`, 'Overwhelmingly Positive')
  const VPgames = await getGames(`${VERY_POSITIVE_URL}`, 'Very Positive')
  const Pgames = await getGames(`${POSITIVE_URL}`, 'Positive')
  const MPgames = await getGames(`${MOSTLY_POSITIVE_URL}`, 'Mostly Positive')

  const games = [...OPgames, ...VPgames, ...Pgames, ...MPgames]

  const steamGames = await scrapeSteam(games)
  const filteredGames = await steamGames.filter(game => Object.keys(game).length === 12)

  // fs.writeFile(`${DATE}-games.json`, JSON.stringify(steamGames), (err) => {
  //   if (err) throw err
  //   console.log('Successfully saved JSON file!')
  // })
  console.timeEnd('time')
  return filteredGames
}
