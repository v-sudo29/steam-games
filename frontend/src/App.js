import { useEffect, useState, useRef } from 'react'
import SortTags from './components/SortTags';
import GenreTags from './components/GenreTags';
import Card from './components/Card';
import './App.css';

function App() {
  const [gamesData, setGamesData] = useState(null)
  const [currentResults, setCurrentResults] = useState(null)
  const [gameCards, setGameCards] = useState(null)
  const [genres, setGenres] = useState([])
  const [sortList, setSortList] = useState([])
  const genreFilters = useRef([
    'Base Building',
    'Colony Sim',
    'Farming Sim',
    'Indie',
    'Life Sim',
    'Pixel Graphics',
    '2D',
  ])
  const sortFilters = useRef([
    'Discount',
    'Current Price',
    'Rating',
    'Feedback',
  ])

  // FUNCTION: set default cards 
  function setDefaultCards() {
    setGameCards(gamesData.map(game => {
      const genreTags = game.genres.map(genre => {
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
          url={game.url}
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
    setCurrentResults(gamesData)
  }

  // useEffect: FETCH SERVER DATA
  useEffect(() => {
    fetch('https://steam-games-server.onrender.com/')
      .then(res => res.json())
      .then(data => {

        // Filter out data that don't have genres property
        const newData = data.filter(game => game.genres ? game : null)
        setGamesData(newData)
        setCurrentResults(newData)
      })
  }, [])

  // useEffect: SET DEFAULT GAME CARDS IF GENRES AND SORT EMPTY
  useEffect(() => {
    if (currentResults !== null && genres.length === 0) {
      setDefaultCards()
    } 
  }, [gamesData, genres, sortList])

  // useEffect: SET NEW GAME CARDS BY GENRES AND SORT
  useEffect(() => {

    // SET BY GENRES ONLY
    if (genres.length !== 0 && gamesData !== null && sortList.length === 0) {
      const matchedGames = []
      const gamesDataCopy = [...gamesData]
      
      for (let i = 0; i < gamesDataCopy.length; i++) {
        const genreExists = gamesDataCopy[i]['genres'].some(genre => genres.includes(genre))
        if (genreExists) {
          matchedGames.push(gamesDataCopy[i])
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
      setCurrentResults(matchedGames)
    } 
    
    // SET BY SORT ONLY (can only choose one sort)
    else if (genres.length === 0 && gamesData !== null && sortList.length !== 0) {
      const currentResultsCopy = [...gamesData]
      let sortedResults = null
      
      // Sort through all sort types
      if (sortList.includes('Discount')) {
        sortedResults = currentResultsCopy.sort((a, b) => {
          const newA = a.discount.replace(/-/g, '').replace(/%/g, '')
          const newB = b.discount.replace(/-/g, '').replace(/%/g, '')

          if (newA > newB) return -1
          else if (newB > newA) return 1
          else return 0
        })
      } else if (sortList.includes('Current Price')) {
        sortedResults = currentResultsCopy.sort((a, b) => {
          const newA = a.currentPrice.replace(/$/g, '')
          const newB = b.currentPrice.replace(/$/g, '')

          if (newA > newB) return 1
          else if (newB > newA) return -1
          else return 0
        })
      } else if (sortList.includes('Rating')) {
        sortedResults = currentResultsCopy.sort((a, b) => {
          const newA = a.rating.replace(/%/g, '')
          const newB = b.rating.replace(/%/g, '')

          if (newA > newB) return -1
          else if (newB > newA) return 1
          else return 0
        })
      } else if (sortList.includes('Feedback')) {
        sortedResults = currentResultsCopy.sort((a, b) => {
          const newA = a.reviewsType
          const newB = b.reviewsType

          if (newA === 'Overwhelmingly Positive' && newB !== 'Overwhelmingly Positive') return -1
          else if (newB === 'Overwhelmingly Positive' && newA !== 'Overwhelmingly Positive') return 1
          else if (newA === 'Very Positive' && newB !== 'Very Positive') return -1
          else if (newB === 'Very Positive' && newA !== 'Very Positive') return 1
          else return 0
        })
      }

      setCurrentResults(sortedResults)
      setGameCards(sortedResults.map(game => {
        const genreTags = game.genres.map(genre => {
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

    // SET BY GENRES AND SORT
    else if (genres.length !== 0 && gamesData !== null && sortList.length !== 0) {
      let gamesDataCopy = []

      if (genres.length === 1) {
        gamesDataCopy = [...currentResults]
      } else if (genres.length > 1) {
        gamesDataCopy = [...gamesData]
      }
      const matchedGames = []
      const genresCopy = [...genres]
      let sortedResults = null

      // Filter by genres
      for (let i = 0; i < gamesDataCopy.length; i++) {
        for (let j = 0; j < genresCopy.length; j++) {
          const genreExists = gamesDataCopy[i]['genres'].some(genre => genresCopy[j].includes(genre))

          if (genreExists && !matchedGames.includes(gamesDataCopy[i])) {
            matchedGames.push(gamesDataCopy[i])
          }   
        }
      }

      // SORT BY SORT TYPE
      if (sortList.includes('Discount')) {
        sortedResults = matchedGames.sort((a, b) => {
          const newA = a.discount.replace(/-/g, '').replace(/%/g, '')
          const newB = b.discount.replace(/-/g, '').replace(/%/g, '')

          if (newA > newB) return -1
          else if (newB > newA) return 1
          else return 0
        }) 
      } else if (sortList.includes('Current Price')) {
        sortedResults = matchedGames.sort((a, b) => {
          const newA = a.currentPrice.replace(/$/g, '')
          const newB = b.currentPrice.replace(/$/g, '')

          if (newA > newB) return 1
          else if (newB > newA) return -1
          else return 0
        })
      } else if (sortList.includes('Rating')) {
        sortedResults = matchedGames.sort((a, b) => {
          const newA = a.rating.replace(/%/g, '')
          const newB = b.rating.replace(/%/g, '')

          if (newA > newB) return -1
          else if (newB > newA) return 1
          else return 0
        })
      } else if (sortList.includes('Feedback')) {
        sortedResults = matchedGames.sort((a, b) => {
          const newA = a.reviewsType
          const newB = b.reviewsType

          if (newA === 'Overwhelmingly Positive' && newB !== 'Overwhelmingly Positive') return -1
          else if (newB === 'Overwhelmingly Positive' && newA !== 'Overwhelmingly Positive') return 1
          else if (newA === 'Very Positive' && newB !== 'Very Positive') return -1
          else if (newB === 'Very Positive' && newA !== 'Very Positive') return 1
          else return 0
        })
      }

      setCurrentResults(sortedResults)
      setGameCards(sortedResults.map(game => {
        const genreTags = game.genres.map(genre => {
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

  }, [genres, sortList])

  return (
    <div className="App">
      <SortTags 
        setSortList={setSortList}
        sortFilters={sortFilters}
      />
      <GenreTags 
        genreFilters={genreFilters}
        genres={genres}
        setGenres={setGenres}
      />
      <div className='search-results'>
        {gamesData === null ? <h1>...Loading</h1> : <>{gameCards}</>}
      </div>
    </div>
  );
}

export default App;