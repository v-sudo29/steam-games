import React from 'react'
import { Text, Stack } from '@chakra-ui/react'

const Discount = ({ discount } : { discount: string }) => {
  return (
    <Stack
      className='game-card-component'
      aria-label='Discount percentage'
      textAlign='center'
      pos='relative'
      align='center'
      direction='row'
      w={window.innerWidth >= 786 ? '3.5rem' : '5rem'}
    >
      <Text
        className='game-card-component'
        p={window.innerWidth >= 786 ? '0.1rem 0.2rem' : '0.2rem 0.5rem'}
        w='inherit'
        borderRadius='0.3rem'
        color='#F5F5F5'
        bg='#2C984A'
        fontWeight='700'
      >
        {discount}
      </Text>
    </Stack>
  )
}

export default Discount