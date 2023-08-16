import { 
  Button,
  HStack,
  Tab,
  Tabs,
  TabList
} from "@chakra-ui/react"
import FilterIcon from "../assets/FilterIcon"
import ExitIcon from "../assets/ExitIcon"
import { useDefaultData } from "../context/defaultDataContext"
import { useFilter } from "../context/FilterContext"
import { useTabs } from "../context/tabsContext"
import { useNavigate, useLocation } from "react-router-dom"

export default function FilterTabs() {
  const { wishlistData } = useDefaultData()
  const { expanded, setExpanded } = useFilter()
  const { gamesTabActive, wishlistTabActive, setGamesTabActive, setWishlistTabActive } = useTabs()
  const navigate = useNavigate()
  const location = useLocation()


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

  const handleFilterBtnClick = () => {
    setExpanded(prev => !prev)
  }

  return (
    <HStack gap='2rem'>
      <Button 
        onClick={handleFilterBtnClick}
        bg='#2F3740' 
        leftIcon={!expanded ? <FilterIcon/> : <ExitIcon/>}
        color='#F5F5F5'
        p='0rem 2rem'
        _hover={{ backgroundColor: '#3b454f' }}
      >
        Filter
      </Button>
      <Tabs index={location.pathname === '/all-games' ? 0 : 1} variant='unstyled'>
        <TabList>
          <Tab
            onClick={(e) => handleTabsChange(e)}
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
    </HStack>
  )
}
