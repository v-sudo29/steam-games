import { Box, HStack, VStack } from "@chakra-ui/react"
import { useMobile } from "../context/useMobileContext"
import SortMenu from "./SortMenu"
import FilterButton from "./FilterButton"
import TwoTabs from "./TwoTabs"
import Logo from "../assets/Logo"
import SearchIcon from "../assets/SearchIcon"

export default function FilterTabs() {
  const isMobile = useMobile()
  return (
    <>
      {isMobile && 
      <VStack align='start' w='100%'>
        <HStack
          p='0rem 1rem'
          mb='1rem' 
          gap='0.8rem'
          w='100%'
        >
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
      }

      {!isMobile && 
        <HStack gap='2rem' w='100%'>
          <FilterButton/>
          <TwoTabs/>
          <SortMenu/>
        </HStack>
      }
    </>
  )
}
