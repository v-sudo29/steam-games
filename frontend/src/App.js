import { useEffect, useState, useRef } from 'react'
import Card from './components/Card';
import './App.css';

function App() {
  const [gamesData, setGamesData] = useState(null)
  const [gameCards, setGameCards] = useState(null)
  const [filters, setFilters] = useState([])
  const searchValue = useRef(null)
  const genreFilters = useRef([
    'Base Building',
    'Colony Sim',
    'Farming Sim',
    'Indie',
    'Life Sim',
    'Pixel Graphics',
    '2D',
  ])

  // FUNCTION: HANDLE SEARCH BUTTON
  function handleSearch() {
    console.log(searchValue.current.value)
  }

  // FUNCTION: HANDLE FILTER CLICK
  function handleFilterClick(e) {
    const currentFilter = e.target.innerHTML

    if (e.target.classList.contains('filter-active')) {
      e.target.classList.remove('filter-active')
      setFilters(prevFilters => {
        return prevFilters.filter(filter => filter !== currentFilter ? filter : null)
      })
    } else {
      e.target.classList.add('filter-active')

      if (filters.length === 0) {
        setFilters([currentFilter])
      } else {
        setFilters(prevFilters => [...prevFilters, currentFilter])
      }
    }
  }

  // FETCH SERVER DATA
  useEffect(() => {
    fetch('https://steam-games-server.onrender.com/')
      .then(res => res.json())
      .then(data => {

        // Filter out data that don't have genres property
        const newData = data.filter(game => game.genres ? game : null)
        setGamesData(newData)
      })
  }, [])

  // SET GENRE FILTER TAGS
  const filterTags = genreFilters.current.map(genre => {
    return (
      <button 
        key={`${genre}ref`} 
        type='button'
        className='filter-tag'
        onClick={handleFilterClick}
      >{genre}
      </button>
    )
  })

  // SET DEFAULT GAME CARDS
  useEffect(() => {
    if (gamesData !== null && filters.length === 0) {
      setGameCards(gamesData.map(game => {
        const gameGenres = game.genres ? game.genres : []
        const genreTags = gameGenres.map(genre => {
          return (
            <div key={`${game.appId+genre}`} className='genre-tag'>
              {genre}
            </div>
          )
        })
        return (
          <Card
            key={game.appId}
            appId={game.appId}
            name={game.name}
            imgUrl={game.imgUrl}
            discount={game.discount}
            originalPrice={game.originalPrice}
            currentPrice={game.currentPrice}
            rating={game.rating}
            reviewsType={game.reviewsType}
            genreTags={genreTags}
          />
        )
      }))
    }
  }, [gamesData, filters])
  
  // SET NEW GAME CARDS
  useEffect(() => {
    if (filters.length !== 0 && gamesData !== null) {
      const matchedGames = []

      for (let i = 0; i < gamesData.length; i++) {
        const genreExists = gamesData[i]['genres'].some(genre => filters.includes(genre))
        if (genreExists) {
          matchedGames.push(gamesData[i])
        } 
      }

      setGameCards(matchedGames.map(game => {
        const gameGenres = game.genres ? game.genres : []
        const genreTags = gameGenres.map(genre => {
          return (
            <div key={`${game.appId+genre}`} className='genre-tag'>
              {genre}
            </div>
          )
        })
        return (
          <Card 
            key={game.appId}
            appId={game.appId}
            name={game.name}
            imgUrl={game.imgUrl}
            discount={game.discount}
            originalPrice={game.originalPrice}
            currentPrice={game.currentPrice}
            rating={game.rating}
            reviewsType={game.reviewsType}
            genreTags={genreTags}
          />
        )
      }))
    }
  }, [filters])

  return (
    <div className="App">
      <div className='search-bar'>
        <input ref={searchValue} type="text" placeholder='Search'/>
        <button onClick={handleSearch} type="button">Search</button>
      </div>
      <div className='genre-filter-container'>
        {filterTags}
      </div>
      <div className='search-results'>
        {gamesData === null ? <h1>...Loading</h1> : <>{gameCards}</>}
      </div>
    </div>
  );
}

export default App;
