import { useEffect, useState } from 'react'
import './App.css';

function App() {
  const [gamesData, setGamesData] = useState('empty')
  const [gameCards, setGameCards] = useState('empty')

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(data => setGamesData(data))
  }, [])

  useEffect(() => {
    if (gamesData !== 'empty') {
      console.log(gamesData)
      setGameCards(gamesData.map(game => {
        const genreCards = game.genres.map(genre => {
          return (
            <div className='genre-tag' key={`${game.appId} + ${genre}`}>
              {genre}
            </div>
          )
        })
        return (
          <div key={game.appId} className='game-card'>
            <h4>{game.name}</h4>
            <img src={game.imgUrl} alt="" />
            <div className='genre-cards-container'>
              {genreCards}
            </div>
          </div>
        )
      }))
    }
  }, [gamesData])

  
  return (
    <div className="App">
      {gamesData === 'empty' ? <h1>...Loading</h1> : <h1>{gameCards}</h1>}
    </div>
  );
}

export default App;
