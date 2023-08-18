import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { GameObject } from '../interface/GameObject'

interface SearchObject {
  searchData: GameObject[] | null,
  setSearchData: React.Dispatch<React.SetStateAction<GameObject[] | null>>,
}

const SearchContext = createContext<SearchObject>({} as SearchObject)

export const useSearch = () => {
  return useContext(SearchContext)
}

export const SearchProvider = ({ children } : { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<GameObject[] | null>(null)

  const searchValues = {
    searchData, setSearchData
  }
  return (
    <SearchContext.Provider value={searchValues}>
      {children}
    </SearchContext.Provider>
  )
}