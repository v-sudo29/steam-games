import { Grid } from "@chakra-ui/react"
import { useDefaultData } from "../../context/defaultDataContext"
import { isSafari } from "react-device-detect"
import { useEffect, useRef } from "react"
import { useSearch } from "../../context/searchContext"
import { useGenres } from "../../context/genresContext"
import { useSortList } from "../../context/sortListContext"
import { usePage } from "../../context/pageContext"
import { useSearchParams } from "react-router-dom"
import { useFilter } from "../../context/filterContext"
import { GameObject } from "../../interface/GameObject"
import ResultsCard from "./ResultsCard"
import SkeletonCard from "./SkeletonCard"
import sortGames from "../../hooks/sortGames"

export default function WishlistCards() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { wishlistLoading, wishlistError, wishlistData, currentResults, currentResultsWL } = useDefaultData()
  const { pageNumberWL } = usePage()
  const { searchData, query, setQuery } = useSearch()
  const { genres, setGenres } = useGenres()
  const { sortList, sortOptions, setSortList } = useSortList()
  const { expanded } = useFilter()
  const firstRender = useRef(false)
  const wishlistCards = useRef<(JSX.Element | null)[] | null>(null)

  // Every filter and sort change, store params in local storage
  useEffect(() => {
    let storageObj
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
      if (keys.includes('currentResults')) currentResults.current = parsedParams.currentResults
      if (keys.includes('currentResultsWL')) {
        currentResultsWL.current = parsedParams.currentResultsWL
        wishlistCards.current = parsedParams.currentResultsWL.map((game: GameObject, index: number) => {
          if (index < 60) return <ResultsCard key={game.appId} game={game}/>
          else return null
        })
      }
    }
    firstRender.current = true
  }, [])

  // Set DEFAULT GAME CARDS if no genre or sort selected
  if (wishlistData && genres.length === 0 && sortList.length === 0 && pageNumberWL === 1) {
    const wishlistDataCopy = wishlistData

    wishlistCards.current = wishlistDataCopy.map((game, index) => {
      if (index < 60) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
    currentResultsWL.current = wishlistDataCopy
  }

  // -------------------------------------
  // SET NEW GAME CARDS BY GENRES AND SORT
  // -------------------------------------

  // Set CARDS by GENRES ONLY
  if (wishlistData && genres.length !== 0 && sortList.length === 0) {
    const matchedGames = []
    const wishlistDataCopy = [...wishlistData]
    
    for (let i = 0; i < wishlistDataCopy.length; i++) {
      const genreExists = wishlistDataCopy[i]['genres']?.some(genre => genres.includes(genre))
      if (genreExists) matchedGames.push(wishlistDataCopy[i])
    }

    wishlistCards.current = matchedGames.map((game, index) => {
      if (index < 60) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
    currentResultsWL.current = matchedGames
  } 
  
  // Set CARDS by SORT ONLY (can only choose one sort at a time)
  if (genres.length === 0 && wishlistData !== null && sortList.length !== 0) {
    const currentResultsCopy = [...wishlistData]
    let sortedResults: GameObject[] | null = null
    
    // Sort through all sort types
    if (sortList.includes(sortOptions.DISCOUNT)) sortedResults = sortGames(currentResultsCopy, sortOptions.DISCOUNT)
    if (sortList.includes(sortOptions.PRICE)) sortedResults = sortGames(currentResultsCopy, sortOptions.PRICE)
    if (sortList.includes(sortOptions.RATING)) sortedResults = sortGames(currentResultsCopy, sortOptions.RATING)
    if (sortList.includes(sortOptions.FEEDBACK)) sortedResults = sortGames(currentResultsCopy, sortOptions.FEEDBACK)
    

    currentResultsWL.current = sortedResults
    wishlistCards.current = sortedResults && sortedResults.map((game, index) => {
      if (index < 60) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
  }

  // Set CARDS by GENRES AND SORT
  if (genres.length !== 0 && wishlistData !== null && sortList.length !== 0 && currentResultsWL.current) {
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
    if (sortList.includes(sortOptions.DISCOUNT)) sortedResults = sortGames(matchedGames, sortOptions.DISCOUNT)
    if (sortList.includes(sortOptions.PRICE)) sortedResults = sortGames(matchedGames, sortOptions.PRICE)
    if (sortList.includes(sortOptions.RATING)) sortedResults = sortGames(matchedGames, sortOptions.RATING)
    if (sortList.includes(sortOptions.FEEDBACK)) sortedResults = sortGames(matchedGames, sortOptions.FEEDBACK)

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