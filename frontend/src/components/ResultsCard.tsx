import openNewTab from '../hooks/openNewTab'
import { GameObject } from '../interface/GameObject'

function ResultsCard({ game } : { game: GameObject }) {
  return (
    <div className='game-card'>
      <img 
        className='card-image'
        src={game.imgUrl} 
        onClick={() => openNewTab(game.url)} 
        alt={game.name} 
      />
      <h3 className='game-title'>{game.name}</h3>
      <div className='game-info'>
        <div className='game-prices'>
          <span className='game-discounted-price'>{game.currentPrice}</span>
          <span className='game-original-price'>{game.originalPrice}</span>
        </div>
        <div className='game-discount-box'>
          <span className='game-discount'>{game.discount}</span>
          {game.historicalLow && <span className='game-historical-low'>Historical Low!</span> }
        </div>
        <div className='game-reviews-ratings-box'>
          <span className='game-reviewsType'>{game.reviewsType}</span>
          <span className='game-ratings'>{game.rating}</span>
        </div>
      </div>
    </div>
  )
}

export default ResultsCard