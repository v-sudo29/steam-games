import { 
  Tab,
  Tabs,
  TabList,
} from "@chakra-ui/react"
import { useTabs } from "../../../../context/tabsContext"
import { useNavigate } from "react-router-dom"
import { useDefaultData } from "../../../../context/defaultDataContext"
import { AllGamesTab } from "./AllGamesTab"
import MyWishlistTab from "./MyWishlistTab"

const TwoTabs = () => {
  const { gamesTabActive, wishlistTabActive, setGamesTabActive, setWishlistTabActive } = useTabs()
  const { wishlistData } = useDefaultData()
  const navigate = useNavigate()

  const handleTabsChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const buttonElement = e.target as HTMLButtonElement
    const tabName = buttonElement.innerText
    
    if (tabName === 'All Games') {
      setGamesTabActive(true)
      setWishlistTabActive(false)
      navigate('all-games')
    }
    else {
      setWishlistTabActive(true)
      setGamesTabActive(false)
      navigate('wishlist')
    }
  }

  return (
    <Tabs index={location.pathname.includes('all-games') ? 0 : 1} variant='unstyled'>
      <TabList>
        <AllGamesTab
          handleTabsChange={handleTabsChange}
          gamesTabActive={gamesTabActive}
        />
        <MyWishlistTab
          handleTabsChange={handleTabsChange}
          wishlistTabActive={wishlistTabActive}
          wishlistData={wishlistData}
        />
      </TabList>
    </Tabs>
  )
}

export default TwoTabs