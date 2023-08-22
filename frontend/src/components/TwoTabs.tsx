import { 
  Tab,
  Tabs,
  TabList,
} from "@chakra-ui/react"

import { useTabs } from "../context/tabsContext"
import { useNavigate } from "react-router-dom"
import { useDefaultData } from "../context/defaultDataContext"

export default function TwoTabs() {
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
    <>
      <Tabs index={location.pathname.includes('all-games') ? 0 : 1} variant='unstyled'>
        <TabList>
          <Tab
            onClick={(e) => handleTabsChange(e)}
            border='none'
            _selected={{color: '#F5F5F5'}}
            _hover={!gamesTabActive ? { color: 'whiteAlpha.700' } : { color: '#F5F5F5' }}
            color='#5C5F63'
            fontWeight='700'
            fontSize='1.3rem'
          >
            All Games
          </Tab>
          <Tab
            onClick={(e) => handleTabsChange(e)}
            border='none'
            _selected={{color: '#F5F5F5'}}
            _hover={!wishlistTabActive ? { color: 'whiteAlpha.700' } : { color: '#F5F5F5' }}
            color='#5C5F63'
            fontWeight='700'
            fontSize='1.3rem'
          >
            My Wishlist {wishlistData && `(${wishlistData.length})`}
          </Tab>
        </TabList>
      </Tabs>
    </>
  )
}
