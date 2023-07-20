import { useEffect, useState, useRef } from 'react'
import Wishlist from './components/Wishlist';
import SortTags from './components/SortTags';
import GenreTags from './components/GenreTags';
import Results from './components/Results';
import useFetch from './hooks/useFetch';
import { GameObject } from './interface/GameObject';
import './App.css';

function App() {
  const [gamesData, setGamesData] = useState<GameObject[] | null>(null)
  const [genres, setGenres] = useState<string[]>([])
  const [sortList, setSortList] = useState<string[]>([])
  const currentResults = useRef<{current: any}>(null)
  const { response: gamesResponse, error: gamesError, isLoading: gamesAreLoading } 
    = useFetch('https://steam-games-server.onrender.com/')

  // useEffect: Set gamesData from fetch response
  useEffect(() => {
    if (gamesResponse) setGamesData(gamesResponse)
  }, [gamesResponse])

  return (
    <div className="App">
      <Wishlist gamesData={gamesData}/>
      <SortTags setSortList={setSortList}/>
      <GenreTags genres={genres} setGenres={setGenres}/>
      <Results 
        gamesAreLoading={gamesAreLoading}
        gamesError={gamesError}
        gamesData={gamesData}
        genres={genres}
        sortList={sortList}
        currentResults={currentResults}
      />
    </div>
  );
}

export default App;