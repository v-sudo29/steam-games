import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react'
import { GameObject } from '../interface/GameObject'
import useFetch from '../hooks/useFetch'

interface DefaultDataObject {
  gamesData: GameObject[] | null,
  wishlistData: GameObject[] | null,
  setGamesData: React.Dispatch<React.SetStateAction<GameObject[] | null>>
  setWishlistData: React.Dispatch<React.SetStateAction<GameObject[] | null>>,
  gamesAreLoading: boolean,
  wishlistLoading: boolean,
  gamesError: string | null,
  wishlistError: string | null,
  currentResults: React.MutableRefObject<GameObject[] | null>
}

const DefaultDataContext = createContext<DefaultDataObject>({} as DefaultDataObject)

export const useDefaultData = () => {
  return useContext(DefaultDataContext)
}

export const DefaultDataProvider = ({ children } : { children: ReactNode }) => {
  const [gamesData, setGamesData] = useState<GameObject[] | null>(null)
  const [wishlistData, setWishlistData] = useState<GameObject[] | null>(null)
  const { response: gamesResponse, error: gamesError, isLoading: gamesAreLoading } 
    = useFetch('https://steam-games-server.onrender.com/all-games')
  const { response: wishlistResponse, error: wishlistError, isLoading: wishlistLoading }
    = useFetch('https://steam-games-server.onrender.com/wishlist')
  const currentResults = useRef<GameObject[] | null>(null)

  useEffect(() => {
    if (gamesResponse) setGamesData(gamesResponse)
  }, [gamesResponse])
  
  useEffect(() => {
    if (wishlistResponse) setWishlistData(wishlistResponse)
  }, [wishlistResponse])

  const defaultInfo = {
    gamesData,
    wishlistData,
    setGamesData,
    setWishlistData,
    gamesAreLoading,
    wishlistLoading,
    gamesError,
    wishlistError,
    currentResults
  }

  return (
    <DefaultDataContext.Provider value={defaultInfo}>
      { children }
    </DefaultDataContext.Provider>
  )
}