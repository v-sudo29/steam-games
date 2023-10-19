import ResultsCard from './results-card/ResultsCard'
import sortGames from '../../hooks/sortGames'
import SkeletonCard from './skeleton-card/SkeletonCard'
import { GameObject } from '../../interface/GameObject'
import { useEffect, useRef } from 'react'
import { Grid } from '@chakra-ui/react'
import { useGenres } from '../../context/genresContext'
import { usePage } from '../../context/pageContext'
import { useSort } from '../../context/sortContext'
import { useDefaultData } from '../../context/defaultDataContext'
import { isSafari } from 'react-device-detect'
import { useSearch } from '../../context/searchContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMobile } from '../../context/useMobileContext'
import { useFilter } from '../../context/filterContext'
import { useTabs } from '../../context/tabsContext'
import axios from 'axios'

const AllGamesCards = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { gamesData, gamesError, gamesAreLoading, currentResults, currentResultsWL } = useDefaultData()
  const { genres, setGenres } = useGenres()
  const { pageNumber, setPageNumber } = usePage()
  const { sort, sortOptions, setSort } = useSort()
  const { searchData, setSearchData, query, setQuery } = useSearch()
  const { setGamesTabActive, setWishlistTabActive } = useTabs()
  const { expanded, setExpanded } = useFilter()
  const isMobile = useMobile()
  const gameCards = useRef<(JSX.Element | null)[] | null>(null)
  const firstRender = useRef(false)

  const navigate = useNavigate()

  // Every filter and sort change, store params in local storage
  useEffect(() => {
    let storageObj = null
    if (firstRender.current) {
      // SEARCH, FILTER, and SORT used 
      if (query && genres.length > 0 && sort.length > 0) {
        const pathname = { q: query, sort: sort, filter: genres }
        storageObj = { 
          q: query,
          sort: sort,
          filter: genres,
          currentResults: currentResults.current,
          currentResultsWL: currentResultsWL.current,
          expanded: expanded
        }
        setSearchParams(pathname)
      }

      // SEARCH and SORT used
      if (query && genres.length === 0 && sort.length > 0) {
        const pathname = { q: query, sort: sort }
        storageObj = { 
          q: query,
          sort: sort,
          currentResults: currentResults.current,
          currentResultsWL: currentResultsWL.current,
          expanded: expanded
        }
        setSearchParams(pathname)
      }

      // FILTER and SORT used
      if (!query && genres.length > 0 && sort.length > 0) {
        const pathname = { sort: sort, filter: genres }
        storageObj = {
          sort: sort,
          filter: genres,
          currentResults: currentResults.current,
          currentResultsWL: currentResultsWL.current,
          expanded: expanded
        }
        setSearchParams(pathname)
      }

      // SORT used
      if (!query && genres.length === 0 && sort.length > 0) {
        const pathname = { sort: sort }
        storageObj = { 
          sort: sort,
          currentResults: currentResults.current,
          currentResultsWL: currentResultsWL.current,
          expanded: expanded
        }
        setSearchParams(pathname)
      }

      // Store pathname in local storage
      if (storageObj) localStorage.setItem('storageObj', JSON.stringify(storageObj))
    }
  }, [genres, sort, expanded, query])

  // When user refreshes, check local storage for stored url pathname on component render. Populate state
  useEffect(() => {
    const urlParams = localStorage.getItem('storageObj')

    // On every visit after the first, checked local storage
    if (urlParams) {
      const parsedParams = JSON.parse(urlParams)
      const keys = Object.keys(parsedParams)
      if (keys.includes('sort')) setSort(parsedParams.sort)
      if (keys.includes('filter')) setGenres(parsedParams.filter)
      if (keys.includes('q')) {
        setQuery(parsedParams.q)
        axios.get(`https://steam-games-server.onrender.com/search?q=${parsedParams.q}`)
          .then(res => {
            navigate('/all-games')
            setGamesTabActive(true)
            setSearchData(res.data)
            setWishlistTabActive(false)
          })
      }
      if (keys.includes('expanded')) setExpanded(parsedParams.expanded)
      if (keys.includes('currentResultsWL')) currentResultsWL.current = parsedParams.currentResultsWL
      if (keys.includes('currentResults')) {
        currentResults.current = parsedParams.currentResults
        if (parsedParams.currentResults){
          gameCards.current = parsedParams.currentResults.map((game: GameObject, index: number) => {
            if (index < 60) return <ResultsCard key={game.appId} game={game}/>
            else return null
          })
        }
      }
    } 
    // On very first visit, store states in local storage
    else {
      if (!query && genres.length === 0 && sort.length > 0) {
        const pathname = { sort: sort }
        const storageObj = { 
          sort: sort,
          currentResults: currentResults.current,
          currentResultsWL: currentResultsWL.current,
          expanded: expanded
        }
        setSearchParams(pathname)
        localStorage.setItem('storageObj', JSON.stringify(storageObj))
      }
    }
    firstRender.current = true
  }, [])

  // On every genres and sort change, reset page number
  useEffect(() => {
    resetPageNumber()
  }, [genres, sort])

  const resetPageNumber = (): void => setPageNumber(1)

  // -------------------------------------
  // SET NEW GAME CARDS BY GENRES AND SORT
  // -------------------------------------
  
  // DEFAULT: Set CARDS by SORT ONLY (can only choose one sort at a time)
  if (genres.length === 0 && gamesData !== null && sort.length !== 0) {
    const currentResultsCopy = [...gamesData]
    let sortedResults: GameObject[] | null = null
    
    // Sort through all sort types
    if (sort.includes(sortOptions.DISCOUNT)) sortedResults = sortGames(currentResultsCopy, sortOptions.DISCOUNT)
    if (sort.includes(sortOptions.PRICE)) sortedResults = sortGames(currentResultsCopy, sortOptions.PRICE)
    if (sort.includes(sortOptions.RATING)) sortedResults = sortGames(currentResultsCopy, sortOptions.RATING)
    if (sort.includes(sortOptions.FEEDBACK)) sortedResults = sortGames(currentResultsCopy, sortOptions.FEEDBACK)
    
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
  if (genres.length !== 0 && gamesData !== null && sort.length !== 0 && currentResults.current) {
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
    if (sort.includes(sortOptions.DISCOUNT)) sortedResults = sortGames(matchedGames, sortOptions.DISCOUNT)
    if (sort.includes(sortOptions.PRICE)) sortedResults = sortGames(matchedGames, sortOptions.PRICE)
    if (sort.includes(sortOptions.RATING)) sortedResults = sortGames(matchedGames, sortOptions.RATING)
    if (sort.includes(sortOptions.FEEDBACK)) sortedResults = sortGames(matchedGames, sortOptions.FEEDBACK)

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
      
      {/* MOBILE */}
      {isMobile && (
        <Grid 
          w='100%'
          h={!isSafari ? '100%' :'min-content'}
          style={ window.innerWidth >= 786 ? 
            {gridTemplateColumns: 'repeat(auto-fill, minmax(13rem, 1fr))'} 
            : 
            {gridTemplateRows: 'repeat(auto-fill), minmax(0rem, 1fr)'}
          }
          gridGap='1rem'
          role='list'
          aria-label='Search results'
        >
          {gameCards.current}
        </Grid>
      )}

      {/* DESKTOP */}
      {!isMobile && (
        <Grid 
          w='100%'
          h={!isSafari ? '100%' :'min-content'}
          templateColumns={window.innerWidth >= 786 ? 'repeat(auto-fill, minmax(15rem, 1fr))' : '1fr'}
          templateRows={window.innerWidth < 786 ? 'repeat(auto-fill, minmax(0rem, 1fr)' : undefined}
          gridGap='1.5rem'
          role='list'
          aria-label='Search results'
        >
          {gameCards.current}
        </Grid>
      )}
      
    </Grid>
  )
  if (gameCards.current.length === 0) return <>No games found.</>
  return <></>
}

export default AllGamesCards