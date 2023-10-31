import { Box, Button, HStack, Link, VStack } from "@chakra-ui/react"
import { useFilter } from "../context/filterContext"
import { useMobile } from "../context/useMobileContext"
import { useSearch } from "../context/searchContext"
import { Outlet } from "react-router-dom"
import FilterButton from "../components/common/sub-header/filter-button/FilterButton"
import GenreTags from "../components/common/sub-header/genre-tags/GenreTags"
import Pagination from "../components/common/pagination/Pagination"
import LogoAndName from "../assets/logo/LogoAndName"
import SearchIcon from "../assets/icons/SearchIcon"
import SortMenu from "../components/common/sub-header/sort-menu/SortMenu"
import TwoTabs from "../components/common/sub-header/two-tabs/TwoTabs"
import SearchBar from "../components/common/header/SearchBar"
import CarrotLeftIcon from "../assets/icons/CarrotLeftIcon"
import CompleteOverlay from "../components/common/overlay/CompleteOverlay"
import SeeThroughOverlay from "../components/common/overlay/SeeThroughOverlay"

export default function ContentLayout() {
  const { expanded, setExpanded } = useFilter()
  const { searchExpanded, setSearchExpanded } = useSearch()
  const isMobile = useMobile()

  const handleFilterBtnClick = (): void => setExpanded(prev => !prev)

  return (
    <VStack align='start' flex='auto'>

      {/* OVERLAY */}
      {searchExpanded && <CompleteOverlay/>}

      {/* MOBILE */}
      {isMobile && (
        <>
          <HStack p='0rem 1rem' mb='1rem' gap='0.8rem' w='100%'>
            <Link onClick={() => localStorage.clear()} href='/'>
              <LogoAndName/>
            </Link>

            {/* MOBILE SEARCH BAR */}
            {searchExpanded && (
              <Box
                pos='absolute'
                display='flex'
                w='95vw'
                zIndex={20}
                alignItems='center'
                justifyContent='center'
              >
                <Button
                  bg='null'
                  _hover={{ backgroundColor: 'transparent' }}
                  onClick={() => setSearchExpanded(false)}
                >
                  <CarrotLeftIcon />
                </Button>
                <SearchBar/>
              </Box>
            )}

            <Box ml='auto' onClick={() => setSearchExpanded(true)} cursor='pointer'>
              <SearchIcon/>
            </Box>
          </HStack>
          <HStack p='0rem 1rem' mb='1rem'>
            <FilterButton handleFilterBtnClick={handleFilterBtnClick}/>
            <SortMenu/>
          </HStack>
          <HStack>
            <TwoTabs/>
          </HStack>
          <HStack 
            flex='auto'
            gap='1rem'
            mt='1rem'
            h='100%'
            w='100%'
            align='start'
          >
            <VStack h={'100%'} w={'100%'} transition='all 200ms ease'>

              {/* OVERLAY */}
              {expanded && <SeeThroughOverlay/>}

              <GenreTags/>
              <Outlet />
              <Pagination/>
            </VStack>
          </HStack>
        </>
      )}

      {/* DESKTOP */}
      {!isMobile && (
        <>
          <HStack gap='2rem' w='100%'>
            <FilterButton handleFilterBtnClick={handleFilterBtnClick}/>
            <TwoTabs/>
            <SortMenu/>
          </HStack>
          <HStack 
            flex='auto'
            gap='1rem'
            mt='1rem'
            h='100%'
            w='100%'
            align='start'
          >
            {/* GENRE TAGS */}
            <GenreTags/>
            <VStack
              h={'100%'}
              w={'100%'}
              transition='margin-left 200ms ease'
              ml={expanded ? '17rem' : '0rem'}
            >
              <Outlet />
            <Pagination/>
            </VStack>
          </HStack>
        </>
      )}
    </VStack>
  )
}
