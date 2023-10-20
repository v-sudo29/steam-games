import { ReactNode, createContext, useContext, useState } from "react";

interface GenresObject {
  genres: string[],
  setGenres: React.Dispatch<React.SetStateAction<string[]>>,
  genreFilters: string[]
}

const GenresContext = createContext<GenresObject>({} as GenresObject)

export const useGenres = () => {
  return useContext(GenresContext)
}

export const GenresProvider = ({ children } : { children: ReactNode }) => {
  const [genres, setGenres] = useState<string[]>([])
  const genreFilters = [
    '2D',
    'Base Building',
    'Card Game',
    'Colony Sim',
    'Cute',
    'Farming',
    'Farming Sim',
    'Indie',
    'Life Sim',
    'Pixel Graphics',
    'Platformer'
  ]

  const genresValues = {
    genres, setGenres, genreFilters
  }

  return (
    <GenresContext.Provider value={genresValues}>
      {children}
    </GenresContext.Provider>
  )
}