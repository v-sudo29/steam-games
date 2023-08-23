import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";

interface GenresObject {
  genres: string[],
  setGenres: React.Dispatch<React.SetStateAction<string[]>>,
  userInteracted: boolean
}

const GenresContext = createContext<GenresObject>({} as GenresObject)

export const useGenres = () => {
  return useContext(GenresContext)
}

export const GenresProvider = ({ children } : { children: ReactNode }) => {
  const [genres, setGenres] = useState<string[]>([])
  const [userInteracted, setUserInteracted] = useState<boolean>(false)
  const firstRender = useRef<boolean | null>(null)
  const secondRender = useRef<boolean | null>(null)

  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true
      console.log('first render!')
      return
    }
    if (firstRender.current && !secondRender.current) {
      secondRender.current = true
      console.log('second render!')
      return
    }
    if (firstRender.current && secondRender.current) {
      setUserInteracted(true)
      return
    }
  }, [genres])


  const genresValues = {
    genres, setGenres, userInteracted
  }

console.log('user has interacted: ',userInteracted)
  return (
    <GenresContext.Provider value={genresValues}>
      {children}
    </GenresContext.Provider>
  )
}