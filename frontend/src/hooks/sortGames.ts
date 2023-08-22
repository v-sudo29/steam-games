import { GameObject } from "../interface/GameObject"

const sortOptions = {
  DISCOUNT: 'Discount',
  PRICE: 'Price',
  RATING: 'Rating',
  FEEDBACK: 'Feedback'
}

export default function sortGames(gamesArr: GameObject[], sortType: string): GameObject[] | null {
  
  if (sortType === sortOptions.DISCOUNT) {
     return gamesArr.sort((a, b) => {
      const newA = a.discount.replace(/-/g, '').replace(/%/g, '')
      const newB = b.discount.replace(/-/g, '').replace(/%/g, '')

      if (newA > newB) return -1
      if (newB > newA) return 1
      return 0
    })
  } 
  if (sortType === sortOptions.PRICE) {
    return gamesArr.sort((a, b) => {
      const newA = Number(a.currentPrice.replace('$', ''))
      const newB = Number(b.currentPrice.replace('$', ''))

      if (newA > newB) return 1
      if (newB > newA) return -1
      return 0
    })
  } 
  if (sortType === sortOptions.RATING) {
    return gamesArr.sort((a, b) => {
      const newA = a.rating.replace(/%/g, '')
      const newB = b.rating.replace(/%/g, '')

      if (newA > newB) return -1
      if (newB > newA) return 1
      return 0
    })
  } 
  if (sortType === sortOptions.FEEDBACK) {
    const overwhelmPosArr = []
    const veryPosArr = []
    const mostlyPosArr = []

    overwhelmPosArr.push(...gamesArr.filter(game => game.reviewsType === 'Overwhelmingly Positive'))
    veryPosArr.push(...gamesArr.filter(game => game.reviewsType === 'Very Positive'))
    mostlyPosArr.push(...gamesArr.filter(game => game.reviewsType === 'Mostly Positive'))

    overwhelmPosArr.push(...gamesArr.filter(game => game.reviewsType === 'OVERWHELMINGLY POSITIVE'))
    veryPosArr.push(...gamesArr.filter(game => game.reviewsType === 'VERY POSITIVE'))
    mostlyPosArr.push(...gamesArr.filter(game => game.reviewsType === 'MOSTLY POSITIVE'))

    return [...overwhelmPosArr, ...veryPosArr, ...mostlyPosArr]
  } 
  return null
}
