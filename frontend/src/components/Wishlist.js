import React, { useState, useEffect } from 'react'

function Wishlist({wishlist, gamesData}) {
  const [wishlistCards, setWishlistCards] = useState(null)

  function openNewTab(url) {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  useEffect(() => {
    if (wishlist && gamesData) {
      const foundGames = []

      wishlist.forEach(game => gamesData.filter(currentGame => currentGame.name === game.name ? foundGames.push(currentGame) : null))
      setWishlistCards(foundGames.map(game => {
        return (
          <div key={game.appId} className='wishlist-card'>
            <h2>{game.name}</h2>
            <img className='wishlist-card-image' src={game.imgUrl} alt={game.name} onClick={() => openNewTab(game.url)} />
            <div className='price-info-container'>
              <div className='discount-container'>Discount: <span className='discount-percentage'>{game.discount}</span></div>
              <div className='original-price-container'>Original Price: <span className='original-price'>{game.originalPrice}</span></div>
              <div className='current-price-container'>Current Price: <span className='current-price'>{game.currentPrice}</span></div>
            </div>
            <div className='rating-reviews-container'>
              <div className='rating-container'>Rating: <span className='rating'>{game.rating}</span></div>
              <div className='reviews-container'>Feedback: <span className='reviews'>{game.reviewsType}</span></div>
            </div>
          </div>
        )
      }))
    }
  }, [wishlist, gamesData])
  return (
    <div className='wishlist-container'>
      <h1>Wishlist</h1>
      <div className='wishlist-games-container'>
        { wishlist ?<>{wishlistCards}</> : <h1>...Loading</h1> }
      </div>
    </div>
  )
}

export default Wishlist