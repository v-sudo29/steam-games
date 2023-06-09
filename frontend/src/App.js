import { useEffect, useState, useRef } from 'react'
import Wishlist from './components/Wishlist';
import SortTags from './components/SortTags';
import GenreTags from './components/GenreTags';
import ResultsCard from './components/ResultsCard';
import Genre from './components/Genre';
import Results from './components/Results';
import useFetch from './hooks/useFetch';
import sortGames from './hooks/sortGames';
import './App.css';

function App() {
  const [wishlist, setWishlist] = useState(null)
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
  const { response: gamesResponse, error: gamesError, isLoading: gamesAreLoading } = useFetch('https://steam-games-server.onrender.com/')
  const { response: wishlistResponse, error: wishlistError, isLoading: wishlistLoading } = useFetch('https://steam-games-server.onrender.com/wishlist')

  // useEffect: Set gamesData from fetch response
  useEffect(() => {
    if (gamesResponse) {
      setGamesData(gamesResponse)
      setCurrentResults(gamesResponse)
    } 
  }, [gamesResponse])

  // useEffect: Set wishlist from fetch response
  useEffect(() => {
    if (wishlistResponse) setWishlist(wishlistResponse)
  }, [wishlistResponse])

  // useEffect: Set default gameCards if sortList and genres are empty
  useEffect(() => {
    const setDefaultCards = () => {
      setGameCards(gamesData.map(game => {
        const genreTags = game.genres.map(genre => {
          return (
            <Genre key={`${game.appId + genre}`} genre={genre}/>
          )
        })
        return (
          <ResultsCard
            key={game.appId}
            game={game}
            genreTags={genreTags}
          />
        )
      }))
    }

    if (gamesData !== null && genres.length === 0 && sortList.length === 0) {
      setDefaultCards()
      setCurrentResults(gamesData)
    } 
  }, [gamesData, genres, sortList])

  // useEffect: SET NEW GAME CARDS BY GENRES AND SORT
  useEffect(() => {

    // Set by GENRES only
    if (genres.length !== 0 && gamesData !== null && sortList.length === 0) {
      const matchedGames = []
      const gamesDataCopy = [...gamesData]
      
      for (let i = 0; i < gamesDataCopy.length; i++) {
        const genreExists = gamesDataCopy[i]['genres'].some(genre => genres.includes(genre))
        if (genreExists) matchedGames.push(gamesDataCopy[i])
      }

      setGameCards(matchedGames.map(game => {
        const gameGenres = game.genres ? game.genres : []
        const genreTags = gameGenres.map(genre => {
          return (
            <Genre key={`${game.appId + genre}`} genre={genre}/>
          )
        })
        return (
          <ResultsCard
            key={game.appId}
            game={game}
            genreTags={genreTags}
          />
        )
      }))
      setCurrentResults(matchedGames)
    } 
    
    // Set by SORT only (can only choose one sort at a time)
    else if (genres.length === 0 && gamesData !== null && sortList.length !== 0) {
      const currentResultsCopy = [...gamesData]
      let sortedResults = null
      
      // Sort through all sort types
      if (sortList.includes('Discount')) {
        sortedResults = sortGames(currentResultsCopy, 'Discount')
      } else if (sortList.includes('Current Price')) {
        sortedResults = sortGames(currentResultsCopy, 'Current Price')
      } else if (sortList.includes('Rating')) {
        sortedResults = sortGames(currentResultsCopy, 'Rating')
      } else if (sortList.includes('Feedback')) {
        sortedResults = sortGames(currentResultsCopy, 'Feedback')
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
          <ResultsCard
            key={game.appId}
            game={game}
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

      // Sort by SORT type
      if (sortList.includes('Discount')) {
        sortedResults = sortGames(matchedGames, 'Discount')
      } else if (sortList.includes('Current Price')) {
        sortedResults = sortGames(matchedGames, 'Current Price')
      } else if (sortList.includes('Rating')) {
        sortedResults = sortGames(matchedGames, 'Rating')
      } else if (sortList.includes('Feedback')) {
        sortedResults = sortGames(matchedGames, 'Feedback')
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
          <ResultsCard
            key={game.appId}
            game={game}
            genreTags={genreTags}
          />
        )
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genres, sortList])

  return (
    <div className="App">
      <Wishlist 
        wishlist={wishlist}
        wishlistError={wishlistError}
        wishlistLoading={wishlistLoading}
        gamesData={gamesData}
      />
      <SortTags 
        setSortList={setSortList}
        sortFilters={sortFilters}
      />
      <GenreTags 
        genreFilters={genreFilters}
        genres={genres}
        setGenres={setGenres}
      />
      <Results 
        gamesAreLoading={gamesAreLoading}
        gamesError={gamesError}
        gamesData={gamesData}
        gameCards={gameCards}
      />
    </div>
  );
}

export default App;