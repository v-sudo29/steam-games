require('dotenv').config()
const puppeteer = require('puppeteer-extra')
const { Cluster } = require('puppeteer-cluster');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const WORKERS_COUNT = 2

const searchResultSelector = 'div.leftcol.large'

const TWO_D_URL = process.env.TWO_D_URL
const BASE_BUILDING_URL = process.env.BASE_BUILDING_URL
const COLONY_SIM_URL = process.env.COLONY_SIM_URL
const CUTE_URL = process.env.CUTE_URL
const INDIE_URL = process.env.INDIE_URL
const FARMING_SIM_URL = process.env.FARMING_SIM_URL
const FARMING_URL = process.env.FARMING_URL
const LIFE_SIM_URL = process.env.LIFE_SIM_URL
const PIXEL_GRAPHICS_URL = process.env.PIXEL_GRAPHICS_URL
const PLATFORMER_URL = process.env.PLATFORMER_URL

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async function getGames(url, gameType) {
  console.log(`Scraping ${gameType} games!`)
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  await page.goto(url, { waitUntil: 'load' })
  if (!await page.$(searchResultSelector)) {
    await browser.close()
    console.log('\nselector does not exist\n')
    return []
  }

  // Get total results
  const resultsNum = await page.evaluate(() => {
    const totalResults = document.querySelector('div.search_results_count') === null 
      ? document.querySelector('#search_results_filtered_warning_persistent').querySelector('div').innerText  
      : document.querySelector('div.search_results_count').innerText 
    
    const totalNumber = parseInt(totalResults.split(' ')[0])
    return totalNumber
  })

  // Get total scrolls
  let totalScrolls = Math.ceil(resultsNum / 14)

  // Scroll to bottom
  for (let i = 0; i < totalScrolls; i++) {
    if (i === 0) await delay(800)
    await page.evaluate(() => window.scrollBy(0, 800))
    await delay(700)
  }

  const gamesArr = []
  let i = 0

  // Grab info on page
  const grabInfo = await page.evaluate(() => {
    const infoArr = []
    let gameTags = null
    if (!document.querySelector('a.search_result_row.ds_collapse_flag.app_impression_tracked')) {
        return []
    }
    gameTags = document
      .querySelector('#search_resultsRows')
      .querySelectorAll('a.search_result_row.ds_collapse_flag.app_impression_tracked')

    gameTags.forEach(async (game) => {
      const gameName = game.querySelector('span.title').innerText
      const redirectLink = game.getAttribute('href')
      const discount = game.querySelector('div.discount_pct').innerText
      const currentPrice = game.querySelector('div.discount_final_price').innerText
      const originalPrice = game.querySelector('div.discount_original_price').innerText
      const reviewsType = game.querySelector('span.search_review_summary.positive') ? 
        game.querySelector('span.search_review_summary.positive').getAttribute('data-tooltip-html') 
        : null
      const rating = reviewsType.split('<br>')[1].split(' ')[0]

      const obj = {
        name: gameName,
        url: redirectLink,
        discount: discount,
        currentPrice: currentPrice,
        originalPrice: originalPrice,
        reviewsType: reviewsType.split('<br>')[0],
        rating: rating
      }
      infoArr.push(obj)
    })
    return infoArr
  })

  // Push games info into gamesArr
  gamesArr.push(...grabInfo)
  await browser.close()
  return gamesArr
}

async function scrapeSteam(games) {
  console.log('Starting steam games scraping!')
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: WORKERS_COUNT,
    puppeteerOptions: {
      headless: 'new',
    }
  })
  const gamesArr = games

  await cluster.task(async ({ page, data: {url, index} }) => {
    if (index === 51) console.log('Scraped 50 games')
    if (index === 101) console.log('Scraped 100 games')
    if (index === 151) console.log('Scraped 150 games')
    if (index === 201) console.log('Scraped 200 games')
    if (index === 251) console.log('Scraped 250 games')
    if (index === 301) console.log('Scraped 300 games')
    if (index === 351) console.log('Scraped 350 games')
    if (index === 401) console.log('Scraped 400 games')
    if (index === 451) console.log('Scraped 450 games')
    if (index === 501) console.log('Scraped 500 games')
    if (index === 551) console.log('Scraped 550 games')
    if (index === 601) console.log('Scraped 600 games')
    if (index === 651) console.log('Scraped 650 games')
    

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
    
    // Game page url
    const storeUrl = await page.evaluate(() => document.querySelector('meta[property="og:url"]').getAttribute('content'))

    // Scrape end date
    const saleEnds = await page.evaluate(() => document.querySelector('p.game_purchase_discount_countdown').innerText
    .split('Offer ends ')[1])

    // Description
    const description = await page.evaluate(() => document.querySelector('meta[property="og:description"]').getAttribute('content'))

    // Append info
    gamesArr[index]['appId'] = storeUrl.split('/')[4]
    gamesArr[index]['imgUrl'] = imgUrl
    gamesArr[index]['genres'] = genres
    gamesArr[index]['url'] = storeUrl
    gamesArr[index]['saleEnds'] = saleEnds
    gamesArr[index]['description'] = description
    i++
  }).catch(err => console.log(err))

  for (let i = 0; i < gamesArr.length; i++) {
    cluster.queue({url: gamesArr[i]['url'], index: i})
  }
  await cluster.idle()
  await cluster.close()

  return gamesArr
}

module.exports = async () => {
  
  const twoDimGames = await getGames(TWO_D_URL, '2D')
  const baseGames = await getGames(BASE_BUILDING_URL, 'Base Building')
  const colonyGames = await getGames(COLONY_SIM_URL, 'Colony Sim')
  const cuteGames = await getGames(CUTE_URL, 'Cute')
  const indieGames = await getGames(INDIE_URL, 'Indie')
  const farmingSimGames = await getGames(FARMING_SIM_URL, 'Farming Sim')
  const farmingGames = await getGames(FARMING_URL, 'Farming')
  const lifeSimGames = await getGames(LIFE_SIM_URL, 'Life Sim')
  const pixelGames = await getGames(PIXEL_GRAPHICS_URL, 'Pixel Graphics')
  const platformerGames = await getGames(PLATFORMER_URL, 'Platformer')

  const games = [
    ...twoDimGames,
    ...baseGames,
    ...colonyGames,
    ...cuteGames,
    ...indieGames,
    ...farmingSimGames,
    ...farmingGames,
    ...lifeSimGames,
    ...pixelGames,
    ...platformerGames
  ]

  // Filter duplicates
  const names = games.map(({ name }) => name)
  const filtered = games.filter(({ name }, index) => !names.includes(name, index + 1))
  const filteredAgain = filtered.filter(game => Object.keys(game).length === 11)

  const steamGames = await scrapeSteam(filteredAgain)
  return steamGames
}
