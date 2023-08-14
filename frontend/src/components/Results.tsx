import ResultsCard from './ResultsCard'
import sortGames from '../hooks/sortGames'
import { GameObject } from '../interface/GameObject'
import { useEffect } from 'react'
import { HStack } from '@chakra-ui/react'
import useFetch from '../hooks/useFetch'

interface ResultsInterface {
  gamesAreLoading: boolean,
  gamesError: string | null,
  gamesData: GameObject[] | null,
  genres: string[],
  sortList: string[] ,
  currentResults: { current: GameObject[] | null },
  pageNumber: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  gamesTabActive: boolean,
  wishlistData: GameObject[] | null,
  wishlistLoading: boolean,
  wishlistError: string | null
}

export default function Results({ 
  gamesAreLoading, 
  gamesError, 
  gamesData, 
  genres, 
  sortList, 
  currentResults,
  pageNumber,
  setPageNumber,
  gamesTabActive,
  wishlistData,
  wishlistLoading,
  wishlistError
}: ResultsInterface ) {
  let gameCards: (JSX.Element | null)[] | null = null
  let wishlistCards: (JSX.Element | null)[] | null = null

  function resetPageNumber(): void {
    setPageNumber(1)
  }

  useEffect(() => {
    resetPageNumber()
  }, [genres, sortList])

  // Set DEFAULT GAME CARDS if no genre or sort selected
  if (gamesData && genres.length === 0 && sortList.length === 0 && pageNumber === 1) {
    const gamesDataCopy = gamesData

    gameCards = gamesDataCopy.map((game, index) => {
      if (index < 25) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
    currentResults.current = gamesDataCopy
  }

  // -------------------------------------
  // SET NEW GAME CARDS BY GENRES AND SORT
  // -------------------------------------

  // Set CARDS by GENRES ONLY
  if (gamesData && genres.length !== 0 && sortList.length === 0) {
    const matchedGames = []
    const gamesDataCopy = [...gamesData]
    
    for (let i = 0; i < gamesDataCopy.length; i++) {
      const genreExists = gamesDataCopy[i]['genres']?.some(genre => genres.includes(genre))
      if (genreExists) matchedGames.push(gamesDataCopy[i])
    }

    gameCards = matchedGames.map((game, index) => {
      if (index < 25) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
    currentResults.current = matchedGames
  } 
  
  // Set CARDS by SORT ONLY (can only choose one sort at a time)
  if (genres.length === 0 && gamesData !== null && sortList.length !== 0) {
    const currentResultsCopy = [...gamesData]
    let sortedResults: GameObject[] | null
    
    // Sort through all sort types
    if (sortList.includes('Discount')) sortedResults = sortGames(currentResultsCopy, 'Discount')
    if (sortList.includes('Current Price')) sortedResults = sortGames(currentResultsCopy, 'Current Price')
    if (sortList.includes('Rating')) sortedResults = sortGames(currentResultsCopy, 'Rating')
    if (sortList.includes('Feedback')) sortedResults = sortGames(currentResultsCopy, 'Feedback')
    
    currentResults.current = sortedResults!
    gameCards = sortedResults!.map((game, index) => {
      if (index < 25) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
  }

  // Set CARDS by GENRES AND SORT
  if (genres.length !== 0 && gamesData !== null && sortList.length !== 0 && currentResults.current) {
    let gamesDataCopy: GameObject[] = []

    if (genres.length === 1) gamesDataCopy = [...currentResults.current]
    if (genres.length > 1) gamesDataCopy = [...gamesData]

    const matchedGames: GameObject[] = []
    const genresCopy = [...genres]
    let sortedResults: GameObject[] | null

    // Filter by genres
    for (let i = 0; i < gamesDataCopy.length; i++) {
      for (let j = 0; j < genresCopy.length; j++) {
        const genreExists = gamesDataCopy[i]['genres']?.some(genre => genresCopy[j].includes(genre))

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

    currentResults.current = sortedResults!
    gameCards = sortedResults!.map((game, index) => {
      if (index < 25) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
  }

  // Display cards according to page number
  if (pageNumber !== 1 && currentResults.current) {
    gameCards = currentResults.current.map((game, index) => {
      if (index > ((25 * pageNumber) - 25) && index < (25 * pageNumber)) {
        return <ResultsCard key={`${game.appId}-results`} game={game}/>
      } return null
    })
  }

  if (!gamesTabActive && wishlistData) {
    wishlistCards = wishlistData.map(game => <ResultsCard key={game.name} game={game}/>)
  }


  return (
    <>
      {gamesTabActive ? 
        <HStack gap='1.5rem' flexWrap='wrap' className='game-results'>
          {gamesAreLoading && <h1>...Loading</h1>}
          {gamesError && <h1>{gamesError}</h1>}
          {gameCards && <>{gameCards}</>}
        </HStack>
      :
        <HStack gap='1.5rem' flexWrap='wrap'>
          {wishlistLoading && <h1>...Loading</h1>}
          {wishlistError && <h1>{wishlistError}</h1>}
          {wishlistCards && <>{wishlistCards}</>}
        </HStack>
      }
    </>
    
  )
}
