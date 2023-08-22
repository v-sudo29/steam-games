import { 
  Button,
  HStack,
  Tab,
  Tabs,
  TabList,
  VStack
} from "@chakra-ui/react"
import { useDefaultData } from "../context/defaultDataContext"
import { useTabs } from "../context/tabsContext"
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
import SortMenu from "./SortMenu"
import FilterButton from "./FilterButton"
import TwoTabs from "./TwoTabs"

export default function FilterTabs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { wishlistData } = useDefaultData()
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

  return (
    <>
    {/* MEDIA QUERY < 791 pixels */}
      {window.innerWidth < 791 && 
      <VStack>
        <HStack>
          <FilterButton/>
          <SortMenu/>
        </HStack>
        <HStack>
          <TwoTabs/>
        </HStack>
      </VStack>
      }


    {/* MEDIA QUERY > 790 pixels */}
      {window.innerWidth > 790 && 
        <HStack gap='2rem' w='100%'>
          <FilterButton/>
          <TwoTabs/>
          <SortMenu/>
        </HStack>
      }
    </>
  )
}
