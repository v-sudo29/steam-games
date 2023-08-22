import { ReactNode, createContext, useContext, useState } from "react"

interface SortListObject {
  sortList: string[],
  setSortList: React.Dispatch<React.SetStateAction<string[]>>,
  sortOptions: {
    DISCOUNT: string;
    RATING: string;
    FEEDBACK: string;
    PRICE: string;
  }
}

const SortListContext = createContext<SortListObject>({} as SortListObject)

export const useSortList = () => {
  return useContext(SortListContext)
}

export const SortListProvider = ({ children } : { children: ReactNode }) => {
  const [sortList, setSortList] = useState<string[]>(['Discount'])
  const sortOptions = {
    DISCOUNT: 'Discount',
    RATING: 'Rating',
    FEEDBACK: 'Feedback',
    PRICE: 'Price'
  }

  const sortInfo = {
    sortList, setSortList, sortOptions
  }

  return (
    <SortListContext.Provider value={sortInfo}>
      {children}
    </SortListContext.Provider>
  )
}