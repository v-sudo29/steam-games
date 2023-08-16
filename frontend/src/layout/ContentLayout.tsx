import { HStack, VStack } from "@chakra-ui/react"
import FilterTabs from "../components/FilterTabs"
import GenreTags from "../components/GenreTags"
import { useFilter } from "../context/filterContext"
import { Outlet } from "react-router-dom"
import PageNumbers from "../components/PageNumbers"

export default function ContentLayout() {
  const { expanded } = useFilter()

  return (
    <VStack align='start' flex='auto'>
      <FilterTabs/>
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
        <PageNumbers/>
        </VStack>
      </HStack>
    </VStack>
  )
}
