import { useEffect, useState, useRef } from 'react'
import Wishlist from './components/Wishlist';
import SortTags from './components/SortTags';
import GenreTags from './components/GenreTags';
import Results from './components/Results';
import PageNumbers from './components/PageNumbers';
import useFetch from './hooks/useFetch';
import { GameObject } from './interface/GameObject';
import { Divider, Stack } from '@chakra-ui/react'
import './App.css';

function App() {
  const [gamesData, setGamesData] = useState<GameObject[] | null>(null)
  const [genres, setGenres] = useState<string[]>([])
  const [sortList, setSortList] = useState<string[]>([])
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [expanded, setExpanded] = useState<boolean>(false)
  const currentResults = useRef<GameObject[] | null>(null)
  const { response: gamesResponse, error: gamesError, isLoading: gamesAreLoading } 
    = useFetch('https://steam-games-server.onrender.com/')

  // useEffect: Set gamesData from fetch response
  useEffect(() => {
    if (gamesResponse) setGamesData(gamesResponse)
  }, [gamesResponse])

  return (
    <div className="App">
      <Wishlist gamesData={gamesData}/>
      <Divider/>
      <Stack justify='center' direction='row'>
        <GenreTags genres={genres} setGenres={setGenres} setExpanded={setExpanded}/>
        <Stack>
          <SortTags setSortList={setSortList}/>
          <Results 
            gamesAreLoading={gamesAreLoading}
            gamesError={gamesError}
            gamesData={gamesData}
            genres={genres}
            sortList={sortList}
            currentResults={currentResults}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
          <PageNumbers 
            setPageNumber={setPageNumber}
            pageNumber={pageNumber} 
            currentResults={currentResults}
            gamesData={gamesData}
            genres={genres}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </Stack>
      </Stack>
    </div>
  );
}

export default App;