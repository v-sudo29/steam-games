import { ReactNode, createContext, useContext, useState } from "react"

interface SortListObject {
  sort: string[],
  setSort: React.Dispatch<React.SetStateAction<string[]>>,
  sortOptions: {
    DISCOUNT: string;
    RATING: string;
    FEEDBACK: string;
    PRICE: string;
  }
}

const SortContext = createContext<SortListObject>({} as SortListObject)

export const useSort = () => {
  return useContext(SortContext)
}

export const SortProvider = ({ children } : { children: ReactNode }) => {
  const [sort, setSort] = useState<string[]>(['Discount'])
  const sortOptions = {
    DISCOUNT: 'Discount',
    RATING: 'Rating',
    FEEDBACK: 'Feedback',
    PRICE: 'Price'
  }

  const sortInfo = {
    sort, setSort, sortOptions
  }

  return (
    <SortContext.Provider value={sortInfo}>
      {children}
    </SortContext.Provider>
  )
}