import { Grid } from "@chakra-ui/react"
import { useDefaultData } from "../context/defaultDataContext"
import ResultsCard from "./ResultsCard"
import SkeletonCard from "./SkeletonCard"
import { isSafari } from "react-device-detect"

export default function WishlistCards() {
  const { wishlistLoading, wishlistError, wishlistData } = useDefaultData()
  let wishlistCards: (JSX.Element | null)[] | null = null

  if (wishlistData)  wishlistCards = wishlistData.map(game => <ResultsCard key={game.name} game={game}/>)
  
  const twentyFiveArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const skeletonCards = twentyFiveArr.map((index) => <SkeletonCard key={`${index}-all-games-skeleton-card`}/>)

  return (
    <Grid w='100%' h='100%'>
      <Grid 
        w='100%'
        h={!isSafari ? '100%' :'min-content'}
        templateColumns='repeat(auto-fill, minmax(15rem, 1fr))'
        gridGap='1.5rem'
        role='list'
        aria-label='Search results'
      >
        {(wishlistLoading || !wishlistCards) && <>{skeletonCards}</>}
        {wishlistError && <h1>{wishlistError}</h1>}
        {wishlistCards && <>{wishlistCards}</>}
      </Grid>
    </Grid>
  )
}
