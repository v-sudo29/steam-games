import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react'
import { GameObject } from '../interface/GameObject'

interface SearchObject {
  searchData: GameObject[] | null,
  setSearchData: React.Dispatch<React.SetStateAction<GameObject[] | null>>,
  query: string | null,
  setQuery: React.Dispatch<React.SetStateAction<string | null>>,
  searchExpanded: boolean,
  setSearchExpanded: React.Dispatch<React.SetStateAction<boolean>>,
  searchRef: React.RefObject<HTMLInputElement>
}

const SearchContext = createContext<SearchObject>({} as SearchObject)

export const useSearch = () => {
  return useContext(SearchContext)
}

export const SearchProvider = ({ children } : { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<GameObject[] | null>(null)
  const [query, setQuery] = useState<string | null>(null)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const searchValues = {
    searchData,
    query,
    setSearchData,
    setQuery,
    searchRef,
    searchExpanded,
    setSearchExpanded
  }

  return (
    <SearchContext.Provider value={searchValues}>
      {children}
    </SearchContext.Provider>
  )
}