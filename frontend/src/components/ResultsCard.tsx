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
      <h3>{game.name}</h3>
    </div>
  )
}

export default ResultsCard