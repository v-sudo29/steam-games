import React, { useState, useEffect } from 'react'
import openNewTab from '../hooks/openNewTab'
import useFetch from '../hooks/useFetch'

function Wishlist({ gamesData }) {
  const [wishlist, setWishlist] = useState(null)
  const { response: wishlistResponse, error: wishlistError, isLoading: wishlistLoading } = useFetch('https://steam-games-server.onrender.com/wishlist')
  let wishlistCards = null

  // useEffect: Set wishlist from fetch response
  useEffect(() => {
    if (wishlistResponse) setWishlist(wishlistResponse)
  }, [wishlistResponse])

  // Show wishlist games that are in gamesData
  if (wishlist && gamesData) {
    const foundGames = []

    wishlist.forEach(game => gamesData.filter(currentGame => currentGame.name === game.name ? foundGames.push(currentGame) : null))
    wishlistCards = foundGames.map(game => {
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
    })
  }

  if (wishlistLoading || !wishlistCards) return <h1>...Loading wishlist</h1>

  if (wishlistError) return <h1>{ wishlistError }</h1>

  if (wishlistCards.length > 0) return (
    <div className='wishlist-container'>
      <h1>Wishlist Games On Sale!</h1>
      <div className='wishlist-games-container'>
        {wishlistCards.length > 0 ? wishlistCards : 'No wishlist games on sale at this time.'}
      </div>
    </div>
  )
}

export default Wishlist