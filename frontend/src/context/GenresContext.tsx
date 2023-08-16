import { ReactNode, createContext, useContext, useState } from "react";

interface GenresObject {
  genres: string[],
  setGenres: React.Dispatch<React.SetStateAction<string[]>>
}

const GenresContext = createContext<GenresObject>({} as GenresObject)

export const useGenres = () => {
  return useContext(GenresContext)
}

export const GenresProvider = ({ children } : { children: ReactNode }) => {
  const [genres, setGenres] = useState<string[]>([])

  const genresValues = {
    genres, setGenres
  }

  return (
    <GenresContext.Provider value={genresValues}>
      {children}
    </GenresContext.Provider>
  )
}