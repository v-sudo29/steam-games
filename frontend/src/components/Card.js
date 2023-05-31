import React from 'react'

function Card(props) {
  return (
    <div key={props.appId} className='game-card'>
      <h3>{props.name}</h3>
      <img src={props.imgUrl} alt="" />
      <div className='price-info-container'>
        <div className='discount-container'>Discount: <span className='discount-percentage'>{props.discount}</span></div>
        <div className='original-price-container'>Original Price: <span className='original-price'>{props.originalPrice}</span></div>
        <div className='current-price-container'>Current Price: <span className='current-price'>{props.currentPrice}</span></div>
      </div>
      <div className='rating-reviews-container'>
        <div className='rating-container'>Rating: <span className='rating'>{props.rating}</span></div>
        <div className='reviews-container'>Feedback: <span className='reviews'>{props.reviewsType}</span></div>
      </div>
      <div className='genre-tags-container'>
        {props.genreTags}
      </div>
    </div>
  )
}

export default Card