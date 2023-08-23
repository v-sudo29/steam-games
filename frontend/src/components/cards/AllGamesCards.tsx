import ResultsCard from './ResultsCard'
import sortGames from '../../hooks/sortGames'
import SkeletonCard from './SkeletonCard'
import { GameObject } from '../../interface/GameObject'
import { useEffect } from 'react'
import { Grid } from '@chakra-ui/react'
import { useGenres } from '../../context/genresContext'
import { usePage } from '../../context/pageContext'
import { useSortList } from '../../context/sortListContext'
import { useDefaultData } from '../../context/defaultDataContext'
import { isSafari } from 'react-device-detect'
import { useSearch } from '../../context/searchContext'
import { useSearchParams } from 'react-router-dom'
import { useMobile } from '../../context/useMobileContext'
import { useFilter } from '../../context/filterContext'
import { useRef } from 'react'

export default function AllGamesCards() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { gamesData, gamesError, gamesAreLoading, currentResults, currentResultsWL } = useDefaultData()
  const { genres, setGenres } = useGenres()
  const { pageNumber, setPageNumber } = usePage()
  const { sortList, sortOptions, setSortList } = useSortList()
  const { searchData, query, setQuery } = useSearch()
  const { expanded } = useFilter()
  const isMobile = useMobile()
  const firstRender = useRef(false)
  const gameCards = useRef<(JSX.Element | null)[] | null>(null)

  // Every filter and sort change, store params in local storage
  useEffect(() => {
    let storageObj = null
    if (firstRender.current) {
      // SEARCH, FILTER, and SORT used 
      if (searchData && genres.length > 0 && sortList.length > 0) {
        const pathname = { q: query, sort: sortList, filter: genres }
        storageObj = { 
          q: query,
          sort: sortList,
          filter: genres,
          currentResults: currentResults.current,
          currentResultsWL: currentResultsWL.current,
          expanded: expanded
        }
        setSearchParams(pathname)
      }

      // FILTER and SORT used
      if (!searchData && genres.length > 0 && sortList.length > 0) {
        const pathname = { sort: sortList, filter: genres }
        storageObj = {
          sort: sortList,
          filter: genres,
          currentResults: currentResults.current,
          currentResultsWL: currentResultsWL.current,
          expanded: expanded
        }
        setSearchParams(pathname)
      }

      // SORT used
      if (!searchData && genres.length === 0 && sortList.length > 0) {
        const pathname = { sort: sortList }
        storageObj = { 
          sort: sortList,
          currentResults: currentResults.current,
          currentResultsWL: currentResultsWL.current,
          expanded: expanded
        }
        setSearchParams(pathname)
      }

      // Store pathname in local storage
      if (storageObj) localStorage.setItem('storageObj', JSON.stringify(storageObj))
    }

  }, [genres, sortList])

  // When user refreshes, check local storage for stored url pathname on component render. Populate state
  useEffect(() => {
    const urlParams = localStorage.getItem('storageObj')
    if (urlParams) {
      const parsedParams = JSON.parse(urlParams)
      const keys = Object.keys(parsedParams)
      if (keys.includes('sort')) setSortList(parsedParams.sort)
      if (keys.includes('filter')) setGenres(parsedParams.filter)
      if (keys.includes('q')) setQuery(parsedParams.q)
      if (keys.includes('currentResultsWL')) currentResultsWL.current = parsedParams.currentResultsWL
      if (keys.includes('currentResults')) {
        currentResults.current = parsedParams.currentResults
        gameCards.current = parsedParams.currentResults.map((game: GameObject, index: number) => {
          if (index < 60) return <ResultsCard key={game.appId} game={game}/>
          else return null
        })
      }
    }
    firstRender.current = true
  }, [])

  // On every genres and sort change, reset page number
  useEffect(() => {
    resetPageNumber()
  }, [genres, sortList])

  const resetPageNumber = (): void => setPageNumber(1)

  // Set DEFAULT GAME CARDS if no genre or sort selected
  if (gamesData && genres.length === 0 && sortList.length === 0 && pageNumber === 1) {
    const gamesDataCopy = gamesData

    gameCards.current = gamesDataCopy.map((game, index) => {
      if (index < 60) return <ResultsCard key={game.appId} game={game}/>
      else return null
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

    gameCards.current = matchedGames.map((game, index) => {
      if (index < 60) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
    currentResults.current = matchedGames
  } 
  
  // Set CARDS by SORT ONLY (can only choose one sort at a time)
  if (genres.length === 0 && gamesData !== null && sortList.length !== 0) {
    const currentResultsCopy = [...gamesData]
    let sortedResults: GameObject[] | null = null
    
    // Sort through all sort types
    if (sortList.includes(sortOptions.DISCOUNT)) sortedResults = sortGames(currentResultsCopy, sortOptions.DISCOUNT)
    if (sortList.includes(sortOptions.PRICE)) sortedResults = sortGames(currentResultsCopy, sortOptions.PRICE)
    if (sortList.includes(sortOptions.RATING)) sortedResults = sortGames(currentResultsCopy, sortOptions.RATING)
    if (sortList.includes(sortOptions.FEEDBACK)) sortedResults = sortGames(currentResultsCopy, sortOptions.FEEDBACK)
    
    if (sortedResults) {
      currentResults.current = sortedResults
      gameCards.current = sortedResults.map((game, index) => {
      if (index < 60) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
    }
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
    if (sortList.includes(sortOptions.DISCOUNT)) sortedResults = sortGames(matchedGames, sortOptions.DISCOUNT)
    if (sortList.includes(sortOptions.PRICE)) sortedResults = sortGames(matchedGames, sortOptions.PRICE)
    if (sortList.includes(sortOptions.RATING)) sortedResults = sortGames(matchedGames, sortOptions.RATING)
    if (sortList.includes(sortOptions.FEEDBACK)) sortedResults = sortGames(matchedGames, sortOptions.FEEDBACK)

    currentResults.current = sortedResults!
    gameCards.current = sortedResults!.map((game, index) => {
      if (index < 60) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
  }

  // Set SEARCH GAME CARDS if searchData is not empty --- TODO: create searchCards component
  if (searchData) {
    const searchDataCopy = [...searchData]

    gameCards.current = searchDataCopy.map((game, index) => {
      if (index < 60) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
    currentResults.current = searchDataCopy
  }

  // Display cards according to page number
  if (pageNumber !== 1 && currentResults.current && currentResults.current.length > 0) {
    gameCards.current = currentResults.current.map((game, index) => {
      if (index > ((60 * pageNumber) - 61) && index < (60 * pageNumber)) {
        return <ResultsCard key={`${game.appId}-results`} game={game}/>
      } return null
    })
  }

  const twentyFiveArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const skeletonCards = twentyFiveArr.map((index) => <SkeletonCard key={`${index}-all-games-skeleton-card`}/>)

  if (gamesAreLoading || !gameCards.current) return (
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
  if (gameCards.current && gameCards.current.length > 0) return (
    <Grid w='100%' h='100%'>
      <Grid 
        w='100%'
        h={!isSafari ? '100%' :'min-content'}
        templateColumns={!isMobile ? 'repeat(auto-fill, minmax(15rem, 1fr))' : 'repeat(auto-fill, minmax(13rem, 1fr))'}
        gridGap={!isMobile ? '1.5rem' : '1rem'}
        role='list'
        aria-label='Search results'
      >
        {gameCards.current}
      </Grid>
    </Grid>
  )
  if (gameCards.current.length === 0) return <>No games found.</>
  return <></>
}
