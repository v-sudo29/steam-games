import { Text } from '@chakra-ui/react'

interface CurrentPriceProps {
  currentPrice: string
  isSafari: boolean
}

const CurrentPrice = ({ currentPrice, isSafari } : CurrentPriceProps) => {
  return (
    <Text
      className='game-card-component'
      aria-label={`Discounted price ${currentPrice}`}
      mr={isSafari ? '0.5rem' : 0}
      fontWeight='bold' fontSize={window.innerWidth >= 786 ? '1xl' : 'xl'}
    >
      {currentPrice}
    </Text>
  )
}

export default CurrentPrice