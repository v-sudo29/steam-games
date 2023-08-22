import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { GameObject } from '../interface/GameObject'

interface SearchObject {
  searchData: GameObject[] | null,
  setSearchData: React.Dispatch<React.SetStateAction<GameObject[] | null>>,
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchContext = createContext<SearchObject>({} as SearchObject)

export const useSearch = () => {
  return useContext(SearchContext)
}

export const SearchProvider = ({ children } : { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<GameObject[] | null>(null)
  const [query, setQuery] = useState<string>('')

  const searchValues = {
    searchData,
    query,
    setSearchData,
    setQuery
  }

  return (
    <SearchContext.Provider value={searchValues}>
      {children}
    </SearchContext.Provider>
  )
}