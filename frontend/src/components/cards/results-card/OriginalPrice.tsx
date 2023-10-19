import React from 'react'
import { Text } from '@chakra-ui/react'

const OriginalPrice = ({ originalPrice } : { originalPrice: string }) => {
  return (
    <Text
      className='game-card-component'
      as='s'
      aria-label={`Original price ${originalPrice}`}
      color='#5D6168'
      fontSize='0.8rem'
    >
      {originalPrice}
    </Text>
  )
}

export default OriginalPrice