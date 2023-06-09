export default function sortGames(gamesArr, sortType) {
  if (sortType === 'Discount') {
     return gamesArr.sort((a, b) => {
      const newA = a.discount.replace(/-/g, '').replace(/%/g, '')
      const newB = b.discount.replace(/-/g, '').replace(/%/g, '')

      if (newA > newB) return -1
      else if (newB > newA) return 1
      else return 0
    })
  } else if (sortType === 'Current Price') {
    return gamesArr.sort((a, b) => {
      const newA = a.currentPrice.replace(/$/g, '')
      const newB = b.currentPrice.replace(/$/g, '')

      if (newA > newB) return 1
      else if (newB > newA) return -1
      else return 0
    })
  } else if (sortType === 'Rating') {
    return gamesArr.sort((a, b) => {
      const newA = a.rating.replace(/%/g, '')
      const newB = b.rating.replace(/%/g, '')

      if (newA > newB) return -1
      else if (newB > newA) return 1
      else return 0
    })
  } else if (sortType === 'Feedback') {
    return gamesArr.sort((a, b) => {
      const newA = a.reviewsType
      const newB = b.reviewsType

      if (newA === 'Overwhelmingly Positive' && newB !== 'Overwhelmingly Positive') return -1
      else if (newB === 'Overwhelmingly Positive' && newA !== 'Overwhelmingly Positive') return 1
      else if (newA === 'Very Positive' && newB !== 'Very Positive') return -1
      else if (newB === 'Very Positive' && newA !== 'Very Positive') return 1
      else return 0
    })
  }
}
