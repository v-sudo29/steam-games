import React from 'react'
import ResultsCard from './ResultsCard'
import sortGames from '../hooks/sortGames'

export default function Results({ gamesAreLoading, gamesError, gamesData, genres, sortList, currentResults }) {
  let gameCards = null

  // Set DEFAULT CARDS if no sort and genres selected
  if (gamesData !== null && sortList.length === 0 && genres.length === 0) {
    gameCards = gamesData.map(game => 
      <ResultsCard key={game.appId} game={game}/>
    )
    currentResults.current = gamesData
  }

  // -------------------------------------
  // SET NEW GAME CARDS BY GENRES AND SORT
  // -------------------------------------

  // Set CARDS by GENRES ONLY
  if (genres.length !== 0 && gamesData !== null && sortList.length === 0) {
    const matchedGames = []
    const gamesDataCopy = [...gamesData]
    
    for (let i = 0; i < gamesDataCopy.length; i++) {
      const genreExists = gamesDataCopy[i]['genres'].some(genre => genres.includes(genre))
      if (genreExists) matchedGames.push(gamesDataCopy[i])
    }

    gameCards = (matchedGames.map(game =>
      <ResultsCard key={game.appId} game={game}/>
    ))    
    currentResults.current = matchedGames
  } 
  
  // Set CARDS by SORT ONLY (can only choose one sort at a time)
  if (genres.length === 0 && gamesData !== null && sortList.length !== 0) {
    const currentResultsCopy = [...gamesData]
    let sortedResults = null
    
    // Sort through all sort types
    if (sortList.includes('Discount')) sortedResults = sortGames(currentResultsCopy, 'Discount')
    if (sortList.includes('Current Price')) sortedResults = sortGames(currentResultsCopy, 'Current Price')
    if (sortList.includes('Rating')) sortedResults = sortGames(currentResultsCopy, 'Rating')
    if (sortList.includes('Feedback')) sortedResults = sortGames(currentResultsCopy, 'Feedback')
    
    currentResults.current = sortedResults
    gameCards = sortedResults.map(game => 
      <ResultsCard key={game.appId} game={game}/>
    )
  }

  // Set CARDS by GENRES AND SORT
  if (genres.length !== 0 && gamesData !== null && sortList.length !== 0) {
    let gamesDataCopy = []

    if (genres.length === 1) gamesDataCopy = [...currentResults.current]
    if (genres.length > 1) gamesDataCopy = [...gamesData]

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
    if (sortList.includes('Discount')) sortedResults = sortGames(matchedGames, 'Discount')
    if (sortList.includes('Current Price')) sortedResults = sortGames(matchedGames, 'Current Price')
    if (sortList.includes('Rating')) sortedResults = sortGames(matchedGames, 'Rating')
    if (sortList.includes('Feedback')) sortedResults = sortGames(matchedGames, 'Feedback')

    currentResults.current = sortedResults
    gameCards = sortedResults.map(game => 
      <ResultsCard key={game.appId} game={game}/>
    )
  }

  return (
    <div className='game-results'>
      {gamesAreLoading && <h1>...Loading</h1>}
      {gamesError && <h1>{gamesError}</h1>}
      {gameCards && <>{gameCards}</>}
    </div>
  )
}
