import { ReactNode, createContext, useContext, useState } from 'react'

interface FilterObject {
  expanded: boolean,
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}
const FilterContext = createContext<FilterObject>({} as FilterObject)

export const useFilter = () => {
  return useContext(FilterContext)
}

export const FilterProvider = ({ children } : { children: ReactNode }) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  const filterValues = { expanded, setExpanded }

  return (
    <FilterContext.Provider value={filterValues}>
      {children}
    </FilterContext.Provider>
  )
}