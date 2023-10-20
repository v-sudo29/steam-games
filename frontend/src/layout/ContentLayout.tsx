import { Box, Button, HStack, Link, VStack } from "@chakra-ui/react"
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
import CarrotLeftIcon from "../assets/icons/CarrotLeftIcon"

export default function ContentLayout() {
  const { expanded, setExpanded } = useFilter()
  const { searchExpanded, setSearchExpanded } = useSearch()
  const isMobile = useMobile()

  return (
    <VStack align='start' flex='auto'>

      {/* OVERLAY */}
      {searchExpanded && (
        <Box
          pos='fixed'
          h='500vh'
          w='200vw'
          zIndex={10}
          backgroundColor='#14191F'
        >
        </Box>
      )}

      {/* MOBILE */}
      {isMobile && (
        <>
          <HStack p='0rem 1rem' mb='1rem' gap='0.8rem' w='100%'>
            <Link onClick={() => localStorage.clear()} href='/'>
              <LogoAndName/>
            </Link>

            {/* MOBILE SEARCH BAR */}
            {searchExpanded && (
              <>
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
          <HStack 
            flex='auto'
            gap='1rem'
            mt='1rem'
            h='100%'
            w='100%'
            align='start'
          >
            <VStack
              h={'100%'}
              w={'100%'}
              transition='all 200ms ease'
            >
              {/* OVERLAY */}
              {expanded && (
                <Box
                  pos='fixed'
                  h='500vh'
                  w='200vw'
                  opacity='0.9'
                  top='0'
                  zIndex={10}
                  backgroundColor='#14191F'
                  onClick={() => setExpanded(false)}
                >
                </Box>
              )}
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
            <FilterButton/>
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
