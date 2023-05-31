import { useEffect, useState, useRef } from 'react'
import './App.css';

function App() {
  const [gamesData, setGamesData] = useState('empty')
  const [gameCards, setGameCards] = useState('empty')
  const searchValue = useRef(null)

  function handleSearch() {
    console.log(searchValue.current.value)
  }

  useEffect(() => {
    fetch('https://steam-games-server.onrender.com/')
      .then(res => res.json())
      .then(data => {
        setGamesData(data)
        console.log(gamesData)
      })
  }, [])

  useEffect(() => {
    if (gamesData !== 'empty') {
      setGameCards(gamesData.map(game => {
        if (!game.imgUrl) {
          return null
        }
        const gameGenres = game.genres ? game.genres : []
        const genreTags = gameGenres.map(genre => {
          return (
            <div key={`${game.appId+genre}`} className='genre-tag'>
              {genre}
            </div>
          )
        })

        return (
          <div key={game.appId} className='game-card'>
            <h4>{game.name}</h4>
            <img src={game.imgUrl} alt="" />
            <div className='price-info-container'>
              <div className='discount-container'>Discount: <span className='discount-percentage'>{game.discount}</span></div>
              <div className='original-price-container'>Original Price: <span className='original-price'>{game.originalPrice}</span></div>
              <div className='current-price-container'>Current Price: <span className='current-price'>{game.currentPrice}</span></div>
            </div>
            <div className='genre-tags-container'>
              {genreTags}
            </div>
          </div>
        )
      }))
    }
  }, [gamesData])

  
  return (
    <div className="App">
      <div className='search-bar'>
        <input ref={searchValue} type="text" placeholder='Search'/>
        <button onClick={handleSearch} type="button">Search</button>
      </div>
      <div className='search-results'>
        {gamesData === 'empty' ? <h1>...Loading</h1> : <>{gameCards}</>}
      </div>
    </div>
  );
}

export default App;
