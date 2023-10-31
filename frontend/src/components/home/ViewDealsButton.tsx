import { Button } from '@chakra-ui/react'
import { isSafari } from 'react-device-detect'
import { BsArrowRightShort } from 'react-icons/bs'

const ViewDealsButton = ({ navigateToDeals } : { navigateToDeals: () => void }) => {
  return (
    <Button
      onClick={navigateToDeals}
      border='none'
      mr={isSafari ? '1rem' : 0}
      rightIcon={<BsArrowRightShort style={{ marginLeft: '-0.3rem'}} size={30}/>}
      fontSize='1.1rem'
      p='1.6rem 1.6rem'
      bg='#8439FF'
      color='#F5F5F5'
      _hover={{ backgroundColor: '#6327c3'}}
    >
      View Deals
    </Button>
  )
}

export default ViewDealsButton