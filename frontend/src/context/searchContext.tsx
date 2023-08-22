import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react'
import { GameObject } from '../interface/GameObject'

interface SearchObject {
  searchData: GameObject[] | null,
  setSearchData: React.Dispatch<React.SetStateAction<GameObject[] | null>>,
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  searchRef: React.RefObject<HTMLInputElement>
}

const SearchContext = createContext<SearchObject>({} as SearchObject)

export const useSearch = () => {
  return useContext(SearchContext)
}

export const SearchProvider = ({ children } : { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<GameObject[] | null>(null)
  const [query, setQuery] = useState<string>('')
  const searchRef = useRef<HTMLInputElement>(null)

  const searchValues = {
    searchData,
    query,
    setSearchData,
    setQuery,
    searchRef
  }

  return (
    <SearchContext.Provider value={searchValues}>
      {children}
    </SearchContext.Provider>
  )
}