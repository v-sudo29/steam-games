import { Grid } from "@chakra-ui/react"
import { useDefaultData } from "../context/defaultDataContext"
import ResultsCard from "./ResultsCard"
import { useEffect } from "react"

export default function WishlistCards() {
  const { wishlistLoading, wishlistError, wishlistData } = useDefaultData()
  let wishlistCards: (JSX.Element | null)[] | null = null

  if (wishlistData)  wishlistCards = wishlistData.map(game => <ResultsCard key={game.name} game={game}/>)

  return (
    <Grid 
      w='100%'
      h='100%'
      templateColumns='repeat(auto-fill, minmax(14rem, 1fr))'
      gridGap='1.5rem'
    >
      {wishlistLoading && <h1>...Loading</h1>}
      {wishlistError && <h1>{wishlistError}</h1>}
      {wishlistCards && <>{wishlistCards}</>}
    </Grid>
  )
}
