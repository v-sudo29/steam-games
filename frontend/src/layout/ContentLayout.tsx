import { Box, HStack, VStack } from "@chakra-ui/react"
import { useFilter } from "../context/filterContext"
import { useMobile } from "../context/useMobileContext"
import { Outlet } from "react-router-dom"
import FilterButton from "../components/FilterButton"
import GenreTags from "../components/GenreTags"
import Pagination from "../components/pagination/Pagination"
import Logo from "../assets/Logo"
import SearchIcon from "../assets/SearchIcon"
import SortMenu from "../components/SortMenu"
import TwoTabs from "../components/TwoTabs"

export default function ContentLayout() {
  const { expanded } = useFilter()
  const isMobile = useMobile()

  return (
    <VStack align='start' flex='auto'>
      {isMobile && (
        <VStack align='start' w='100%'>
          <HStack p='0rem 1rem' mb='1rem' gap='0.8rem' w='100%'>
            <Box>
              <Logo/>
            </Box>
            <Box>
              <FilterButton/>
            </Box>
            <Box>
              <SortMenu/>
            </Box>
            <Box ml='auto'>
              <SearchIcon/>
            </Box>
          </HStack>
          <HStack>
            <TwoTabs/>
          </HStack>
        </VStack>
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
