import { ReactNode, createContext, useContext, useState } from 'react'

interface TabsObject {
  gamesTabActive: boolean,
  wishlistTabActive: boolean,
  setGamesTabActive: React.Dispatch<React.SetStateAction<boolean>>,
  setWishlistTabActive: React.Dispatch<React.SetStateAction<boolean>>
}

const TabsContext = createContext<TabsObject>({} as TabsObject)

export const useTabs = () => {
  return useContext(TabsContext)
}

export const TabsProvider = ({ children } : { children: ReactNode}) => {
  const [gamesTabActive, setGamesTabActive] = useState<boolean>(true)
  const [wishlistTabActive, setWishlistTabActive] = useState<boolean>(false)

  const tabsValues = {
    gamesTabActive,
    wishlistTabActive,
    setGamesTabActive,
    setWishlistTabActive
  }

  return (
    <TabsContext.Provider value={tabsValues}>
      {children}
    </TabsContext.Provider>
  )
}