import { 
  Button,
  HStack,
  Tab,
  Tabs,
  TabList
} from "@chakra-ui/react"
import FilterIcon from "../assets/FilterIcon"

export default function FilterTabs() {
  return (
    <HStack gap='2rem'>
      <Button 
        bg='#2F3740' 
        leftIcon={<FilterIcon/>}
        color='#F5F5F5'
        p='0rem 2rem'
      >
        Filter
      </Button>
      <Tabs defaultIndex={1} variant='unstyled'>
        <TabList>
          <Tab 
            _selected={{ color: '#F5F5F5' }}
            color='#5C5F63'
            fontWeight='600'
            fontSize='1.3rem'
          >
            All Games
          </Tab>
          <Tab 
            _selected={{ color: '#F5F5F5' }}
            color='#5C5F63'
            fontWeight='600'
            fontSize='1.3rem'
          >
            My Wishlist (25)
          </Tab>
        </TabList>
      </Tabs>
    </HStack>
  )
}
