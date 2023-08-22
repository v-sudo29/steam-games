import ResultsCard from './ResultsCard'
import sortGames from '../hooks/sortGames'
import SkeletonCard from './SkeletonCard'
import { GameObject } from '../interface/GameObject'
import { useEffect } from 'react'
import { Grid } from '@chakra-ui/react'
import { useGenres } from '../context/genresContext'
import { usePage } from '../context/pageContext'
import { useSortList } from '../context/sortListContext'
import { useDefaultData } from '../context/defaultDataContext'
import { isSafari } from 'react-device-detect'
import { useSearch } from '../context/searchContext'
import { useSearchParams } from 'react-router-dom'

export default function AllGamesCards() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { gamesData, gamesError, gamesAreLoading, currentResults } = useDefaultData()
  const { genres } = useGenres()
  const { pageNumber, setPageNumber } = usePage()
  const { sortList } = useSortList()
  const { searchData, query } = useSearch()
  let gameCards: (JSX.Element | null)[] | null = null

  useEffect(() => {
    // SEARCH, FILTER, and SORT used 
    if (searchData && genres.length > 0 && sortList.length > 0) setSearchParams({ q: query, sort: sortList, filter: genres })

    // FILTER and SORT used
    if (!searchData && genres.length > 0 && sortList.length > 0) setSearchParams({ sort: sortList, filter: genres })

    // SORT used
    if (!searchData && genres.length === 0 && sortList.length > 0) setSearchParams({ sort: sortList })
  }, [])

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
      if (index < 60) {
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
      if (index < 60) {
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
      if (index < 60) {
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
      if (index < 60) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
  }

  // Set SEARCH GAME CARDS if searchData is not empty --- TODO: create searchCards component
  if (searchData) {
    const searchDataCopy = [...searchData]

    gameCards = searchDataCopy.map((game, index) => {
      if (index < 60) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
    currentResults.current = searchDataCopy
  }

  // Display cards according to page number
  if (pageNumber !== 1 && currentResults.current && currentResults.current.length > 0) {
    gameCards = currentResults.current.map((game, index) => {
      if (index > ((60 * pageNumber) - 61) && index < (60 * pageNumber)) {
        return <ResultsCard key={`${game.appId}-results`} game={game}/>
      } return null
    })
  }

  const twentyFiveArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const skeletonCards = twentyFiveArr.map((index) => <SkeletonCard key={`${index}-all-games-skeleton-card`}/>)

  if (gamesAreLoading || !gameCards) return (
    <Grid 
      w='100%'
      h='100%'
      templateColumns='repeat(auto-fill, minmax(15rem, 1fr))'
      gridGap='1.5rem'
    >
      {skeletonCards}
    </Grid>
  )
  if (gamesError) return <h1>{gamesError}</h1>
  if (gameCards && gameCards.length > 0) return (
    <Grid w='100%' h='100%'>
      <Grid 
        w='100%'
        h={!isSafari ? '100%' :'min-content'}
        templateColumns='repeat(auto-fill, minmax(15rem, 1fr))'
        gridGap='1.5rem'
        role='list'
        aria-label='Search results'
      >
        {gameCards}
      </Grid>
    </Grid>
  )
  if (gameCards.length === 0) return <>No games found.</>
  return <></>
}
