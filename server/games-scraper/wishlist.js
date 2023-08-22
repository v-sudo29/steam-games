require('dotenv').config()

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());

const wishlist_url = process.env.WISHLIST_URL;
const wishlistSelector = 'div.discount_pct';

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

let gamesArr = []
module.exports = async () => {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    'args' : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })
  const page = await browser.newPage()

  await page.goto(`${ wishlist_url }`, { waitUntil: 'load' })
  await page.waitForSelector(wishlistSelector)

  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => window.scrollBy(0, 700))
    await delay(800)
  }

  const discountedGames = await page.evaluate(() => {
    gamesArr = []
    const gameTags = document.querySelectorAll('.wishlist_row')
    gameTags.forEach(tag => {
      const discountIsTrue = tag.querySelector('div.discount_pct') ? true : false
      const reviewsTypeIsMixed = tag.querySelector('div.value.game_review_summary').classList.contains('mixed') ? true : false
  
      if (discountIsTrue && !reviewsTypeIsMixed) {
        const appId = tag.dataset.appId
        const gameName = tag.querySelector('a.title').innerText
        const reviewsType = tag.querySelector('div.value.game_review_summary').innerText
        const originalPrice = tag.querySelector('div.discount_original_price').innerText
        const currentPrice = tag.querySelector('div.discount_final_price').innerText
        const discount = tag.querySelector('div.discount_pct').innerText
        const url = tag.querySelector('a.title').href
        const imgUrl = tag.querySelector('a.capsule img').src
        const rating = tag.querySelector('div.value.game_review_summary').dataset.tooltipText
        const genreTags = tag.querySelectorAll('.tag')
        const genresArr = []

        genreTags.forEach(element => genresArr.push(element.innerText))

        gamesArr.push({
          wishlist: true,
          appId: appId,
          name: gameName,
          reviewsType: reviewsType,
          originalPrice: originalPrice,
          currentPrice: currentPrice,
          discount: discount,
          url: url,
          imgUrl: imgUrl,
          rating: rating.split(' ')[0],
          genres: [...genresArr]
        })
      }
    })
    return gamesArr
  })

  await browser.close()
  return discountedGames
}