import { ReactNode, createContext, useContext, useState } from "react"

interface SortListObject {
  sortList: string[],
  setSortList: React.Dispatch<React.SetStateAction<string[]>>
}

const SortListContext = createContext<SortListObject>({} as SortListObject)

export const useSortList = () => {
  return useContext(SortListContext)
}

export const SortListProvider = ({ children } : { children: ReactNode }) => {
  const [sortList, setSortList] = useState<string[]>(['Discount'])

  const sortInfo = {
    sortList, setSortList
  }

  return (
    <SortListContext.Provider value={sortInfo}>
      {children}
    </SortListContext.Provider>
  )
}