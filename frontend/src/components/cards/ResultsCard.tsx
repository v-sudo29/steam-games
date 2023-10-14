import { 
  Box,
  Card,
  HStack,
  Image,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import openNewTab from '../../hooks/openNewTab'
import { GameObject } from '../../interface/GameObject'
import { isSafari } from 'react-device-detect'
import { useMobile } from '../../context/useMobileContext'

const ResultsCard = ({ game } : { game: GameObject }) => {
  const isMobile = useMobile()
  return (
    <figure className='game-card-component' style={{ height: 'inherit', width: 'inherit', pointerEvents: 'none' }}>
      <Card 
        onClick={() => openNewTab(game.url)}
        className='game-card-component'
        display='flex'
        flex='auto'
        role="list item"
        overflow='hidden'
        variant='outline'
        direction='column'
        cursor='pointer'
        transition='ease 0.1s'
        _hover={{
          backgroundColor: '#2d3544'
        }}
        pointerEvents='auto'
        border='none'
        borderRadius='0.8rem'
        bg='#1C222C'
        color='#F5F5F5'
        p='1rem'
        gap='0.9rem'
      >
        <Image
          className='game-card-component'
          borderRadius='0.4rem'
          loading='lazy'
          src={game.imgUrl} 
          alt={game.name} 
          objectFit='cover'
          h='inherit'
          mb={isSafari ? '0.9rem' : '0'}
          aria-label="Game cover art"
        />
        {/* GAME INFO */}
        <HStack 
          className='game-card-component'
          gap='1rem'
          align='start'
          h='100%'
          flexGrow='1'
        >
          {/* GAME TITLE AND CURRENT PRICE */}
          <VStack
            className='game-card-component'
            h='100%'
            w='100%'
            align='start'
            mr='1rem'
          >
            <Box 
              className='gameTitle game-card-component'
              mb={isSafari ? '0.9rem' : '0'}
              fontSize='0.9rem'
              fontWeight='600'
              height='auto'
            >
              <figcaption className='gameTitle game-card-component' 
                style={{
                  marginBottom: isSafari ? '0.9rem' : '0',
                  fontSize: !isMobile ? '0.9rem' : '1rem',
                  fontWeight: '600',
                  height: '3rem'
                }}>
                {game.name}
              </figcaption>
            </Box>
            <Stack className='game-card-component' w='100%' mt='auto' direction='row' align='center'>
              <Text
                className='game-card-component'
                aria-label={`Discounted price ${game.currentPrice}`}
                mr={isSafari ? '0.5rem' : 0}
                fontWeight='bold' fontSize='1xl'
              >
                {game.currentPrice}
              </Text>
              <Text
                className='game-card-component'
                as='s'
                aria-label={`Original price ${game.originalPrice}`}
                color='#5D6168'
                fontSize='0.8rem'
              >
                {game.originalPrice}
              </Text>    
            </Stack>
          </VStack>

          {/* GAME DISCOUNT */}
          <Stack
            className='game-card-component'
            aria-label='Discount percentage'
            textAlign='center'
            pos='relative'
            align='center'
            direction='row'
            w='3.5rem'
          >
            <Text
              className='game-card-component'
              p='0.1rem 0.2rem'
              w='inherit'
              borderRadius='0.3rem'
              color='#F5F5F5'
              bg='#2C984A'
              fontWeight='700'
            >
              {game.discount}
            </Text>
          </Stack>
        </HStack>
      </Card>
    </figure>
  )
}

export default ResultsCard