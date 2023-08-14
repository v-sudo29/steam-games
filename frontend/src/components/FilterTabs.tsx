import { 
  Button,
  HStack,
  Tab,
  Tabs,
  TabList
} from "@chakra-ui/react"
import FilterIcon from "../assets/FilterIcon"
import { useState } from "react"

export default function FilterTabs() {
  const [tabOneActive, setTabOneActive] = useState<boolean>(false)
  const [tabTwoActive, setTabTwoActive] = useState<boolean>(true)
  
  const handleTabsChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const buttonElement = e.target as HTMLButtonElement
    const tabName = buttonElement.innerText

    if (tabName === 'All Games') {
      setTabOneActive(true)
      setTabTwoActive(false)
    }
    else {
      setTabTwoActive(true)
      setTabOneActive(false)
    }
  }

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
            onClick={(e) => handleTabsChange(e)}
            _selected={tabOneActive ? { color: '#F5F5F5' } : { color: '#5C5F63' }}
            _hover={!tabOneActive ? { color: 'whiteAlpha.700' } : { color: '#F5F5F5' }}
            color='#5C5F63'
            fontWeight='700'
            fontSize='1.3rem'
          >
            All Games
          </Tab>
          <Tab
            onClick={(e) => handleTabsChange(e)}
            _selected={tabTwoActive ? { color: '#F5F5F5' } : { color: '#5C5F63' }}
            _hover={!tabTwoActive ? { color: 'whiteAlpha.700' } : { color: '#F5F5F5' }}
            color='#5C5F63'
            fontWeight='700'
            fontSize='1.3rem'
          >
            My Wishlist (25)
          </Tab>
        </TabList>
      </Tabs>
    </HStack>
  )
}
