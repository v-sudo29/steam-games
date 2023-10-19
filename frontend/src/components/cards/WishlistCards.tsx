import { Grid } from "@chakra-ui/react"
import { useDefaultData } from "../../context/defaultDataContext"
import { isSafari } from "react-device-detect"
import { useEffect, useRef } from "react"
import { useSearch } from "../../context/searchContext"
import { useGenres } from "../../context/genresContext"
import { useSort } from "../../context/sortContext"
import { usePage } from "../../context/pageContext"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useFilter } from "../../context/filterContext"
import { useTabs } from "../../context/tabsContext"
import { GameObject } from "../../interface/GameObject"
import ResultsCard from "./results-card/ResultsCard"
import SkeletonCard from "./skeleton-card/SkeletonCard"
import sortGames from "../../hooks/sortGames"
import axios from "axios"

const WishlistCards = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { wishlistLoading, wishlistError, wishlistData, currentResults, currentResultsWL } = useDefaultData()
  const { pageNumberWL } = usePage()
  const { query, setQuery, setSearchData } = useSearch()
  const { genres, setGenres } = useGenres()
  const { sort, sortOptions, setSort } = useSort()
  const { setGamesTabActive, setWishlistTabActive } = useTabs()
  const { expanded, setExpanded } = useFilter()
  const wishlistCards = useRef<(JSX.Element | null)[] | null>(null)
  const firstRender = useRef(false)

  const navigate = useNavigate()
  
  // Every state change, store params in local storage
  useEffect(() => {
    let storageObj
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
          navigate('/wishlist')
          setGamesTabActive(false)
          setSearchData(res.data)
          setWishlistTabActive(true)
        })
      }
      if (keys.includes('expanded')) setExpanded(parsedParams.expanded)
      if (keys.includes('currentResults')) currentResults.current = parsedParams.currentResults
      if (keys.includes('currentResultsWL')) {
        currentResultsWL.current = parsedParams.currentResultsWL
        wishlistCards.current = parsedParams.currentResultsWL.map((game: GameObject, index: number) => {
          if (index < 60) return <ResultsCard key={game.appId} game={game}/>
          else return null
        })
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

  // -------------------------------------
  // SET NEW GAME CARDS BY GENRES AND SORT
  // -------------------------------------

  // DEFAULT: Set CARDS by SORT ONLY (can only choose one sort at a time)
  if (genres.length === 0 && wishlistData !== null && sort.length !== 0) {
    const currentResultsCopy = [...wishlistData]
    let sortedResults: GameObject[] | null = null
    
    // Sort by SORT type
    if (sort.includes(sortOptions.DISCOUNT)) sortedResults = sortGames(currentResultsCopy, sortOptions.DISCOUNT)
    if (sort.includes(sortOptions.PRICE)) sortedResults = sortGames(currentResultsCopy, sortOptions.PRICE)
    if (sort.includes(sortOptions.RATING)) sortedResults = sortGames(currentResultsCopy, sortOptions.RATING)
    if (sort.includes(sortOptions.FEEDBACK)) sortedResults = sortGames(currentResultsCopy, sortOptions.FEEDBACK)

    currentResultsWL.current = sortedResults
    if (sortedResults) {
      wishlistCards.current = sortedResults && sortedResults.map((game, index) => {
        if (index < 60) {
          return <ResultsCard key={game.appId} game={game}/>
        } return null
      })
    }
  }

  // Set CARDS by GENRES AND SORT
  if (genres.length !== 0 && wishlistData !== null && sort.length !== 0 && currentResultsWL.current) {
    let wishlistDataCopy: GameObject[] = []

    if (genres.length === 1) wishlistDataCopy = [...currentResultsWL.current]
    if (genres.length > 1) wishlistDataCopy = [...wishlistData]

    const matchedGames: GameObject[] = []
    const genresCopy = [...genres]
    let sortedResults: GameObject[] | null

    // Filter by genres
    for (let i = 0; i < wishlistDataCopy.length; i++) {
      for (let j = 0; j < genresCopy.length; j++) {
        const genreExists = wishlistDataCopy[i]['genres']?.some(genre => genresCopy[j].includes(genre))

        if (genreExists && !matchedGames.includes(wishlistDataCopy[i])) {
          matchedGames.push(wishlistDataCopy[i])
        }   
      }
    }

    // Sort by SORT type
    if (sort.includes(sortOptions.DISCOUNT)) sortedResults = sortGames(matchedGames, sortOptions.DISCOUNT)
    if (sort.includes(sortOptions.PRICE)) sortedResults = sortGames(matchedGames, sortOptions.PRICE)
    if (sort.includes(sortOptions.RATING)) sortedResults = sortGames(matchedGames, sortOptions.RATING)
    if (sort.includes(sortOptions.FEEDBACK)) sortedResults = sortGames(matchedGames, sortOptions.FEEDBACK)

    currentResultsWL.current = sortedResults!
    wishlistCards.current = sortedResults!.map((game, index) => {
      if (index < 60) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
  }
  
  // Display cards according to page number if data is more than 60 length
  if (pageNumberWL !== 1 && wishlistData && wishlistData.length > 0) {
    wishlistCards.current = wishlistData.map((game, index) => {
      if (index > ((60 * pageNumberWL) - 61) && index < (60 * pageNumberWL)) {
        return <ResultsCard key={`${game.appId}-results`} game={game}/>
      } return null
    })
  }
  const twentyFiveArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const skeletonCards = twentyFiveArr.map((index) => <SkeletonCard key={`${index}-all-games-skeleton-card`}/>)

  // RENDER JSX ELEMENTS
  if (wishlistLoading || !wishlistCards.current) return (
    <Grid w='100%' h='100%'>
      <Grid 
        w='100%'
        h={!isSafari ? '100%' :'min-content'}
        templateColumns='repeat(auto-fill, minmax(15rem, 1fr))'
        gridGap='1.5rem'
        role='list'
        aria-label='Search results'
      >
        {skeletonCards}
      </Grid>
    </Grid>
  )

  if (wishlistError) return <h1>{wishlistError}</h1>
  if (wishlistCards.current && wishlistCards.current.length > 0) return (
    <Grid w='100%' h='100%'>
      <Grid 
        w='100%'
        h={!isSafari ? '100%' :'min-content'}
        templateColumns='repeat(auto-fill, minmax(15rem, 1fr))'
        gridGap='1.5rem'
        role='list'
        aria-label='Search results'
      >
        {wishlistCards.current}
      </Grid>
    </Grid>
  )
  if (wishlistCards.current.length === 0) return <>No games found.</>
  return <></>
}

export default WishlistCards