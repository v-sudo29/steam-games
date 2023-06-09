import React, { useState, useEffect } from 'react'

function Wishlist({wishlist, gamesData}) {
  const [wishlistCards, setWishlistCards] = useState(null)

  useEffect(() => {
    if (wishlist && gamesData) {
      const foundGames = []
      const wishlistGames = wishlist.map(game => {
        const gameInWishlist = gamesData.filter(currentGame => currentGame.name === game.name ? foundGames.push(currentGame) : null)
        if (gameInWishlist.length > 0) {
          console.log(gameInWishlist)
          return (
            <div key={game.appId} className='wishlist-card'>
              <h2>{game.name} hi</h2>
              <img src={game.imgUrl} alt={game.name} />
            </div>
          )
        } return null
      })
      setWishlistCards(wishlistGames)
    }
  }, [wishlist, gamesData])
  return (
    <div>
      {wishlist ?<>{wishlistCards}</> : <h1>...Loading</h1> }
    </div>
  )
}

export default Wishlist