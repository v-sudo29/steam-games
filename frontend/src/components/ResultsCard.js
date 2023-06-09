import React from 'react'
import openNewTab from '../hooks/openNewTab'

function ResultsCard({game, genreTags}) {
  return (
    <div className='game-card'>
      <h3>{game.name}</h3>
      <img 
        className='card-image'
        src={game.imgUrl} 
        onClick={() => openNewTab(game.url)} 
        alt={game.name} 
      />
      <div className='price-info-container'>
        <div className='discount-container'>Discount: <span className='discount-percentage'>{game.discount}</span></div>
        <div className='original-price-container'>Original Price: <span className='original-price'>{game.originalPrice}</span></div>
        <div className='current-price-container'>Current Price: <span className='current-price'>{game.currentPrice}</span></div>
      </div>
      <div className='rating-reviews-container'>
        <div className='rating-container'>Rating: <span className='rating'>{game.rating}</span></div>
        <div className='reviews-container'>Feedback: <span className='reviews'>{game.reviewsType}</span></div>
      </div>
      <div className='genre-tags-container'>
        {genreTags}
      </div>
    </div>
  )
}

export default ResultsCard