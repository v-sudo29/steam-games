import { 
  Button,
  HStack,
  Tab,
  Tabs,
  TabList
} from "@chakra-ui/react"
import FilterIcon from "../assets/FilterIcon"
import ExitIcon from "../assets/ExitIcon"
import { GameObject } from "../interface/GameObject"

interface FilterTabsInterface {
  expanded: boolean,
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>,
  gamesTabActive: boolean,
  setGamesTabActive: React.Dispatch<React.SetStateAction<boolean>>,
  wishlistTabActive: boolean,
  setWishlistTabActive: React.Dispatch<React.SetStateAction<boolean>>
  wishlistData: GameObject[] | null
}

export default function FilterTabs({
  expanded, 
  setExpanded,
  gamesTabActive,
  setGamesTabActive,
  wishlistTabActive,
  setWishlistTabActive,
  wishlistData
} : FilterTabsInterface) {

  
  const handleTabsChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const buttonElement = e.target as HTMLButtonElement
    const tabName = buttonElement.innerText

    if (tabName === 'All Games') {
      setGamesTabActive(true)
      setWishlistTabActive(false)
    }
    else {
      setWishlistTabActive(true)
      setGamesTabActive(false)
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
      <Tabs defaultIndex={1} variant='unstyled'>
        <TabList>
          <Tab
            onClick={(e) => handleTabsChange(e)}
            _selected={gamesTabActive ? { color: '#F5F5F5' } : { color: '#5C5F63' }}
            _hover={!gamesTabActive ? { color: 'whiteAlpha.700' } : { color: '#F5F5F5' }}
            color='#5C5F63'
            fontWeight='700'
            fontSize='1.3rem'
          >
            All Games
          </Tab>
          <Tab
            onClick={(e) => handleTabsChange(e)}
            _selected={wishlistTabActive ? { color: '#F5F5F5' } : { color: '#5C5F63' }}
            _hover={!wishlistTabActive ? { color: 'whiteAlpha.700' } : { color: '#F5F5F5' }}
            color='#5C5F63'
            fontWeight='700'
            fontSize='1.3rem'
          >
            My Wishlist ({wishlistData && wishlistData.length})
          </Tab>
        </TabList>
      </Tabs>
    </HStack>
  )
}
