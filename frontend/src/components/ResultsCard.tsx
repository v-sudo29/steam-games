import openNewTab from '../hooks/openNewTab'
import { GameObject } from '../interface/GameObject'
import { Box, Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react'

function ResultsCard({ game } : { game: GameObject }) {
  return (
    <Card 
      onClick={() => openNewTab(game.url)}
      overflow='hidden'
      h='10rem' 
      w='62rem'
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
        width='20rem'
        height='10rem'
      />

      <Stack w='30rem' justify='center' p='1.5rem'>
          <Heading fontSize='1.3rem' fontWeight='600'>{game.name}</Heading>
      </Stack>

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
          <Text fontWeight='bold' fontSize='3xl'>{game.currentPrice}</Text>
        </Stack>
        {game.historicalLow ? 
          <>
            <Text color='white' bg='green' fontSize='0.7rem'>Historical Low!</Text>
            <Text fontWeight='500' color='blue.400' >{game.reviewsType}</Text>
          </>
          : 
          <Box pos='relative' top='1rem'>
            <Text fontWeight='500' color='blue.400' >{game.reviewsType}</Text>
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