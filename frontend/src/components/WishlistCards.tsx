import { Grid } from "@chakra-ui/react"
import { useDefaultData } from "../context/defaultDataContext"
import { isSafari } from "react-device-detect"
import { useEffect } from "react"
import { useSearch } from "../context/searchContext"
import { useGenres } from "../context/genresContext"
import { useSortList } from "../context/sortListContext"
import { usePage } from "../context/pageContext"
import { useSearchParams } from "react-router-dom"
import ResultsCard from "./ResultsCard"
import SkeletonCard from "./SkeletonCard"
import { GameObject } from "../interface/GameObject"
import sortGames from "../hooks/sortGames"

export default function WishlistCards() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { wishlistLoading, wishlistError, wishlistData, currentResultsWL } = useDefaultData()
  const { pageNumberWL } = usePage()
  const { searchData, query } = useSearch()
  const { genres } = useGenres()
  const { sortList, sortOptions } = useSortList()

  let wishlistCards: (JSX.Element | null)[] | null = null

  // Display accurate url search params in url
  useEffect(() => {
    // SEARCH, FILTER, and SORT used 
    if (searchData && genres.length > 0 && sortList.length > 0) setSearchParams({ q: query, sort: sortList, filter: genres })

    // FILTER and SORT used
    if (!searchData && genres.length > 0 && sortList.length > 0) setSearchParams({ sort: sortList, filter: genres })

    // SORT used
    if (!searchData && genres.length === 0 && sortList.length > 0) setSearchParams({ sort: sortList })
  }, [])

  // Set DEFAULT GAME CARDS if no genre or sort selected
  if (wishlistData && genres.length === 0 && sortList.length === 0 && pageNumberWL === 1) {
    const wishlistDataCopy = wishlistData

    wishlistCards = wishlistDataCopy.map((game, index) => {
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

    wishlistCards = matchedGames.map((game, index) => {
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
    wishlistCards = sortedResults && sortedResults.map((game, index) => {
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
    wishlistCards = sortedResults!.map((game, index) => {
      if (index < 60) {
        return <ResultsCard key={game.appId} game={game}/>
      } return null
    })
  }
  
  // Display cards according to page number if data is more than 60 length
  if (pageNumberWL !== 1 && wishlistData && wishlistData.length > 0) {
    wishlistCards = wishlistData.map((game, index) => {
      if (index > ((60 * pageNumberWL) - 61) && index < (60 * pageNumberWL)) {
        return <ResultsCard key={`${game.appId}-results`} game={game}/>
      } return null
    })
  }
  const twentyFiveArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const skeletonCards = twentyFiveArr.map((index) => <SkeletonCard key={`${index}-all-games-skeleton-card`}/>)

  // RENDER JSX ELEMENTS
  if (wishlistLoading || !wishlistCards) return (
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
  if (wishlistCards && wishlistCards.length > 0) return (
    <Grid w='100%' h='100%'>
      <Grid 
        w='100%'
        h={!isSafari ? '100%' :'min-content'}
        templateColumns='repeat(auto-fill, minmax(15rem, 1fr))'
        gridGap='1.5rem'
        role='list'
        aria-label='Search results'
      >
        {wishlistCards}
      </Grid>
    </Grid>
  )
  if (wishlistCards.length === 0) return <>No games found.</>
  return <></>
}
