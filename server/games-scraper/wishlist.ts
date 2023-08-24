import dotenv from 'dotenv'
dotenv.config()
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { IWishlist } from '../models/Wishlist';
puppeteer.use(StealthPlugin());

const wishlist_url = process.env.WISHLIST_URL;
const wishlistSelector = 'div.discount_pct';

function delay(time: number): Promise<unknown> {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

let gamesArr: IWishlist[] = []

export default async () => {
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
    const gameTags = document.querySelectorAll('.wishlist_row') as NodeListOf<HTMLDivElement>
    gameTags.forEach(tag => {
      const discountIsTrue = tag.querySelector('div.discount_pct') ? true : false
      const reviewsTypeIsMixed = tag.querySelector('div.value.game_review_summary')?.classList.contains('mixed') ? true : false
  
      if (discountIsTrue && !reviewsTypeIsMixed) {
        const appId = tag.dataset.appId
        const gameName = (tag.querySelector('a.title') as HTMLAnchorElement).innerText
        const reviewsType = (tag.querySelector('div.value.game_review_summary') as HTMLDivElement).innerText
        const originalPrice = (tag.querySelector('div.discount_original_price') as HTMLDivElement).innerText
        const currentPrice = (tag.querySelector('div.discount_final_price') as HTMLDivElement).innerText
        const discount = (tag.querySelector('div.discount_pct') as HTMLDivElement).innerText
        const url = (tag.querySelector('a.title') as HTMLAnchorElement).href
        const imgUrl = (tag.querySelector('a.capsule img') as HTMLImageElement).src
        const rating = (tag.querySelector('div.value.game_review_summary') as HTMLDivElement).dataset.tooltipText
        const genreTags = tag.querySelectorAll('.tag') as NodeListOf<HTMLDivElement>
        const genresArr: string[] = []

        genreTags.forEach(element => genresArr.push(element.innerText))

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
          rating: rating?.split(' ')[0] ?? null,
          genres: [...genresArr]
        })
      }
    })
    return gamesArr
  })

  await browser.close()
  return discountedGames
}