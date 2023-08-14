import { useEffect, useState, useRef } from 'react'
import useFetch from './hooks/useFetch';
import { GameObject } from './interface/GameObject';
import { Container } from '@chakra-ui/react'
import './App.css';
import Header from './components/Header';
import FilterTabs from './components/FilterTabs';
import Content from './components/Content';

function App() {
  const [gamesData, setGamesData] = useState<GameObject[] | null>(null)
  const [wishlistData, setWishlistData] = useState<GameObject[] | null>(null)
  const [genres, setGenres] = useState<string[]>([])
  const [sortList, setSortList] = useState<string[]>([])
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [expanded, setExpanded] = useState<boolean>(false)
  const [gamesTabActive, setGamesTabActive] = useState<boolean>(false)
  const [wishlistTabActive, setWishlistTabActive] = useState<boolean>(true)
  
  const currentResults = useRef<GameObject[] | null>(null)
  const { response: gamesResponse, error: gamesError, isLoading: gamesAreLoading } 
    = useFetch('https://steam-games-server.onrender.com/', 'games')
  const { response: wishlistResponse, error: wishlistError, isLoading: wishlistLoading } = 
  useFetch('https://steam-games-server.onrender.com/wishlist', 'wishlist')

  // useEffect: Set gamesData from fetch response
  useEffect(() => {
    if (gamesResponse) setGamesData(gamesResponse)
  }, [gamesResponse])

  useEffect(() => {
    if (wishlistResponse) setWishlistData(wishlistResponse)
  }, [wishlistResponse])

  return (
    <Container
      minH='100vh'
      maxW='100vw'
      display='flex'
      flexDir='column'
      gap='1rem'
      padding='2rem 2rem'
      bg='#14191F'
      color='#F5F5F5'
    >
      <Header />
      <FilterTabs
        expanded={expanded}
        setExpanded={setExpanded}
        gamesTabActive={gamesTabActive}
        setGamesTabActive={setGamesTabActive}
        wishlistTabActive={wishlistTabActive}
        setWishlistTabActive={setWishlistTabActive}
      />
      <Content
        genres={genres}
        setGenres={setGenres}
        gamesAreLoading={gamesAreLoading}
        gamesError={gamesError}
        gamesData={gamesData}
        sortList={sortList}
        currentResults={currentResults}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        expanded={expanded}
        setExpanded={setExpanded}
        gamesTabActive={gamesTabActive}
        wishlistData={wishlistData}
        wishlistLoading={wishlistLoading}
        wishlistError={wishlistError}
      />
    </Container>
  );
}

export default App;