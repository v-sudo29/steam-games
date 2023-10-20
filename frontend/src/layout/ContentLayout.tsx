import { Box, HStack, Link, VStack } from "@chakra-ui/react"
import { useFilter } from "../context/filterContext"
import { useMobile } from "../context/useMobileContext"
import { Outlet } from "react-router-dom"
import FilterButton from "../components/common/header/FilterButton"
import GenreTags from "../components/common/header/GenreTags"
import Pagination from "../components/common/pagination/Pagination"
import LogoAndName from "../assets/logo/LogoAndName"
import SearchIcon from "../assets/icons/SearchIcon"
import SortMenu from "../components/common/header/SortMenu"
import TwoTabs from "../components/common/header/TwoTabs"
import { useSearch } from "../context/searchContext"
import SearchBar from "../components/common/header/SearchBar"

export default function ContentLayout() {
  const { expanded } = useFilter()
  const { searchExpanded, setSearchExpanded } = useSearch()
  const isMobile = useMobile()

  return (
    <VStack align='start' flex='auto'>
      {isMobile && (
        <>
          <HStack p='0rem 1rem' mb='1rem' gap='0.8rem' w='100%'>
            <Link onClick={() => localStorage.clear()} href='/'>
              <LogoAndName/>
            </Link>
            {searchExpanded && (
              <>
                {/* MOBILE SEARCH BAR */}
                <Box pos='absolute' w='95vw'>
                  <SearchBar/>
                </Box>

                {/* OVERLAY */}
                <Box
                  pos='absolute'
                  height='500vh'
                  width='100vw'
                  border='1px solid white'
                  zIndex={30}
                >

                </Box>
              </>
            )}
            <Box
              ml='auto'
              onClick={() => setSearchExpanded(true)}
              cursor='pointer'
            >
              <SearchIcon/>
            </Box>
          </HStack>
          <HStack p='0rem 1rem' mb='1rem'>
            <FilterButton/>
            <SortMenu/>
          </HStack>
          <HStack>
            <TwoTabs/>
          </HStack>
        </>
      )}

      {!isMobile && (
        <HStack gap='2rem' w='100%'>
          <FilterButton/>
          <TwoTabs/>
          <SortMenu/>
        </HStack>
      )}
      <HStack 
        flex='auto'
        gap='1rem'
        mt='1rem'
        h='100%'
        w='100%'
        align='start'
      >
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
    </VStack>
  )
}
