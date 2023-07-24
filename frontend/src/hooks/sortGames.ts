import { GameObject } from "../interface/GameObject"

export default function sortGames(gamesArr: GameObject[], sortType: string): GameObject[] | null {
  if (sortType === 'Discount') {
     return gamesArr.sort((a, b) => {
      const newA = a.discount.replace(/-/g, '').replace(/%/g, '')
      const newB = b.discount.replace(/-/g, '').replace(/%/g, '')

      if (newA > newB) return -1
      if (newB > newA) return 1
      return 0
    })
  } 
  if (sortType === 'Current Price') {
    return gamesArr.sort((a, b) => {
      const newA = a.currentPrice.replace(/$/g, '')
      const newB = b.currentPrice.replace(/$/g, '')

      if (newA > newB) return 1
      if (newB > newA) return -1
      return 0
    })
  } 
  if (sortType === 'Rating') {
    return gamesArr.sort((a, b) => {
      const newA = a.rating.replace(/%/g, '')
      const newB = b.rating.replace(/%/g, '')

      if (newA > newB) return -1
      if (newB > newA) return 1
      return 0
    })
  } 
  if (sortType === 'Feedback') {
    const overwhelmPosArr = []
    const veryPosArr = []
    const mostlyPosArr = []

    overwhelmPosArr.push(...gamesArr.filter(game => game.reviewsType === 'Overwhelmingly Positive'))
    veryPosArr.push(...gamesArr.filter(game => game.reviewsType === 'Very Positive'))
    mostlyPosArr.push(...gamesArr.filter(game => game.reviewsType === 'Mostly Positive'))

    return [...overwhelmPosArr, ...veryPosArr, ...mostlyPosArr]
  } 
  return null
}
