import { ReactNode, createContext, useContext, useEffect, useState } from "react"

interface PageObject {
  pageNumber: number,
  pageNumberWL: number,
  paginationExpanded: boolean,
  paginationExpandedWL: boolean,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  setPageNumberWL: React.Dispatch<React.SetStateAction<number>>,
  setPaginationExpanded: React.Dispatch<React.SetStateAction<boolean>>
  setPaginationExpandedWL: React.Dispatch<React.SetStateAction<boolean>>
}

const PageContext = createContext<PageObject>({} as PageObject)

export const usePage = () => {
  return useContext(PageContext)
}

export const PageProvider = ({ children } : { children: ReactNode }) => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageNumberWL, setPageNumberWL] = useState<number>(1)
  const [paginationExpanded, setPaginationExpanded] = useState<boolean>(false)
  const [paginationExpandedWL, setPaginationExpandedWL] = useState<boolean>(false)

  useEffect(() => {
    console.log(pageNumber)
  }, [pageNumber])
  
  const pageInfo = {
    pageNumber,
    pageNumberWL, 
    paginationExpanded,
    paginationExpandedWL,
    setPageNumber,
    setPageNumberWL,
    setPaginationExpanded,
    setPaginationExpandedWL
  }

  return (
    <PageContext.Provider value={pageInfo}>
      {children}
    </PageContext.Provider>
  )
}