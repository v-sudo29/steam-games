import { Tab } from "@chakra-ui/react"

interface AllGamesTabProps {
  handleTabsChange: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  gamesTabActive: boolean
}

export const AllGamesTab = ({ handleTabsChange, gamesTabActive } : AllGamesTabProps) => {
  return (
    <Tab
      onClick={handleTabsChange}
      border='none'
      _selected={{ color: '#F5F5F5' }}
      _hover={!gamesTabActive ? { color: 'whiteAlpha.700' } : { color: '#F5F5F5' }}
      color='#5C5F63'
      fontWeight='700'
      fontSize='1.3rem'
    >
      All Games
    </Tab>
  )
}
