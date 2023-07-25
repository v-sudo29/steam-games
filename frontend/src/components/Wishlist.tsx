import { useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { GameObject } from '../interface/GameObject'
import ResultsCard from './ResultsCard'
import { Heading } from '@chakra-ui/react'

function Wishlist({ gamesData }: { gamesData: GameObject[] | null }) {
  const [wishlist, setWishlist] = useState<GameObject[] | null>(null)
  const { response: wishlistResponse, error: wishlistError, isLoading: wishlistLoading } = useFetch('https://steam-games-server.onrender.com/wishlist', 'wishlist')
  let wishlistCards: JSX.Element[] | null = null

  // useEffect: Set wishlist from fetch response
  useEffect(() => {
    if (wishlistResponse) {
      setWishlist(wishlistResponse)
      console.log(wishlistResponse)
    }
  }, [wishlistResponse])

  // Show wishlist games that are in gamesData
  if (wishlist && gamesData) {
    const foundGames: GameObject[] = []

    wishlist.forEach(game => gamesData.filter(currentGame => currentGame.name === game.name && foundGames.push(currentGame)))
    wishlistCards = foundGames.map(game => <ResultsCard key={game.name} game={game}/>)
  }

  if (wishlistLoading || !wishlistCards) return <h1>...Loading wishlist</h1>
  if (wishlistError) return <h1>{ wishlistError }</h1>
  if (wishlistCards.length > 0) return (
    <div className='wishlist-container'>
      <Heading p='2rem'>Wishlist Games On Sale!</Heading>
      <div className='wishlist-games-container'>
        {wishlistCards.length > 0 ? wishlistCards : 'No wishlist games on sale at this time.'}
      </div>
    </div>
  )
  return <></>
}

export default Wishlist