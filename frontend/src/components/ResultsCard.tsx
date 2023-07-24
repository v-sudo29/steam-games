import openNewTab from '../hooks/openNewTab'
import { GameObject } from '../interface/GameObject'
import { Box, Card, Heading, Image, Stack, Text } from '@chakra-ui/react'

function ResultsCard({ game } : { game: GameObject }) {
  return (
    <Card 
      onClick={() => openNewTab(game.url)}
      overflow='hidden'
      h='6rem' 
      maxW='45rem'
      minW='30rem'
      variant='outline'
      direction='row'
      cursor='pointer'
      transition='ease 0.1s'
      _hover={{
        'backgroundColor': 'RGBA(0, 0, 0, 0.06)'
      }}
      border='1px solid RGBA(0, 0, 0, 0.06)'
    >
      <Image 
        src={game.imgUrl} 
        alt={game.name} 
        objectFit='cover'
        width='15rem'
        h='inherit'
      />

      {/* GAME TITLE */}
      <Stack w='20rem' justify='center' p='1.5rem'>
          <Heading fontSize='1rem' fontWeight='600'>{game.name}</Heading>
      </Stack>

      {/* GAME INFO */}
      <Stack 
        ml='auto' 
        justify='center' 
        w='14rem'
        direction='column'
        align='center'
        mr='1rem'
      >

        <Stack mr='3rem' mt='1rem' direction='row' align='center'>
          <Text as='s' color='gray' fontSize='0.8rem'>{game.originalPrice}</Text>
          <Text fontWeight='bold' fontSize='2xl'>{game.currentPrice}</Text>
        </Stack>
        {game.historicalLow ? 
          <>
            <Text pos='relative' mb='-1.2rem' ml='0.5rem' bottom='0.6rem' color='white' bg='green' fontSize='0.5rem'>Historical Low!</Text>
            <Text fontWeight='500' color='blue.400' >{game.reviewsType}</Text>
          </>
          : 
          <Box pos='relative' top='0rem'>
            <Text fontWeight='500' color='blue.300' >{game.reviewsType}</Text>
          </Box>
        }
      </Stack>

      <Stack pos='relative' h='2.5rem' ml='-3rem' justify='center' direction='row' w='4rem'>
        <Text borderRadius='sm' p='0.5rem' color='white' bg='green' fontWeight='600'>{game.discount}</Text>
      </Stack>
    </Card>
  )
}

export default ResultsCard