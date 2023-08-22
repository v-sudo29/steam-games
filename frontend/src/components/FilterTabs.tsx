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
import { useFilter } from "../context/filterContext"
import { useTabs } from "../context/tabsContext"
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { useGenres } from "../context/genresContext"
import { isSafari } from "react-device-detect"
import SortMenu from "./SortMenu"
import { useSearch } from "../context/searchContext"
import { useEffect } from "react"
import { useSortList } from "../context/sortListContext"

export default function FilterTabs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { wishlistData } = useDefaultData()
  const { expanded, setExpanded } = useFilter()
  const { gamesTabActive, wishlistTabActive, setGamesTabActive, setWishlistTabActive } = useTabs()
  const { genres } = useGenres()
  const { searchData, query } = useSearch()
  const { sortList } = useSortList()

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

  const handleFilterBtnClick = () => setExpanded(prev => !prev)

  return (
    <HStack gap='2rem' w='100%'>
      <Button
        onClick={handleFilterBtnClick}
        aria-expanded={expanded}
        aria-controls='filters'
        mr={isSafari ? '2rem' : 0}
        border='none'
        bg='#2F3740' 
        leftIcon={!expanded ? <FilterIcon/> : <ExitIcon/>}
        color='#F5F5F5'
        p='0rem 2rem'
        pr={genres.length > 0 ? '2rem' : '2rem'}
        _hover={{ backgroundColor: '#3b454f' }}
      >
        Filter {(genres.length > 0 && !expanded) && `(${genres.length})`}
      </Button>
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
      <SortMenu/>
    </HStack>
  )
}
