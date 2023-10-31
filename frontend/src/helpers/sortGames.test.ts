import { GameObject } from "../interface/GameObject";
import sortGames from "./sortGames";

const defaultGameObject = {
  appId: '',
  currentPrice: '',
  discount: '',
  genres: [''],
  historicalLow: false,
  id: '',
  imgUrl: '',
  name: '',
  originalPrice: '',
  rating: '',
  reviewsType: '',
  saleEnds: '',
  url: ''
}

const randomPrices = ['$4.00', '$1.00', '$9.00']
const gamesArrayPrice = randomPrices.map(price => (
  { ...defaultGameObject, currentPrice: price }
))

const randomDiscounts = ['-50%', '-20%', '-99%']
const gamesArrayDiscount = randomDiscounts.map(discount => (
  { ...defaultGameObject, discount: discount }
))

const randomRatings = ['50%', '2%', '80%']
const gamesArrayRating = randomRatings.map(rating => (
  { ...defaultGameObject, rating: rating}
))

const randomFeedback = ['Mostly Positive', 'Overwhelmingly Positive', 'Very Positive']
const gamesArrayFeedback = randomFeedback.map(feedback => (
  { ...defaultGameObject, reviewsType: feedback}
))

describe('sortGames helper function', () => {
  test('returns sorted array by \'PRICE\' type', () => {
    const sortedGames = sortGames(gamesArrayPrice, 'Price')
    
    expect(sortedGames?.length).toBeGreaterThan(0)
    expect(sortedGames).toHaveLength(gamesArrayPrice.length)
    expect((sortedGames as GameObject[])[0].currentPrice).toBe('$1.00')
  })

  test('returns sorted array by \'DISCOUNT\' type', () => {
    const sortedGames = sortGames(gamesArrayDiscount, 'Discount')

    expect(sortedGames?.length).toBeGreaterThan(0)
    expect(sortedGames).toHaveLength(gamesArrayPrice.length)
    expect((sortedGames as GameObject[])[0].discount).toBe('-99%')
  })

  test('returns sorted array by \'RATING\' type', () => {
    const sortedGames = sortGames(gamesArrayRating, 'Rating')

    expect(sortedGames?.length).toBeGreaterThan(0)
    expect(sortedGames).toHaveLength(gamesArrayRating.length)
    expect((sortedGames as GameObject[])[0].rating).toBe('80%')
  })

  test('returns sorted array by \'FEEDBACK\' type', () => {
    const sortedGames = sortGames(gamesArrayFeedback, 'Feedback')

    expect(sortedGames?.length).toBeGreaterThan(0)
    expect(sortedGames).toHaveLength(gamesArrayFeedback.length)
    expect((sortedGames as GameObject[])[0].reviewsType).toBe('Overwhelmingly Positive')
  })
})