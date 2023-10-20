import { 
  Box,
  Card,
  HStack,
  Stack,
  VStack
} from '@chakra-ui/react'
import openNewTab from '../../../helpers/openNewTab'
import { GameObject } from '../../../interface/GameObject'
import { isSafari } from 'react-device-detect'
import { useMobile } from '../../../context/useMobileContext'
import Image from './Image'
import Discount from './Discount'
import CurrentPrice from './CurrentPrice'
import OriginalPrice from './OriginalPrice'
import GameName from './GameName'

const ResultsCard = ({ game } : { game: GameObject }) => {
  const isMobile = useMobile()

  return (
    <figure
      className='game-card-component'
      style={{
        height: 'inherit',
        width: 'inherit', 
        pointerEvents: 'none'
      }}
    >
      <Card 
        onClick={() => openNewTab(game.url)}
        height='inherit'
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
        borderRadius={window.innerWidth >= 786 ? '0.8rem' : 'none'}
        bg='#1C222C'
        color='#F5F5F5'
        p='1rem'
        gap='0.9rem'
        style={ window.innerWidth < 786 ? {
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1.5fr'
        } : undefined}
      >
        
        {/* DESKTOP BREAKPOINT */}
        { window.innerWidth >= 786 && (
          <>
            {/* GAME IMAGE */}
            <Image game={game} isSafari={isSafari}/>

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
                  <GameName
                    name={game.name}
                    isSafari={isSafari}
                    isMobile={isMobile}  
                  />
                </Box>
                <Stack
                  className='game-card-component'
                  w='100%'
                  mt='auto'
                  direction='row'
                  align='center'
                >
                  <CurrentPrice currentPrice={game.currentPrice} isSafari={isSafari}/>
                  <OriginalPrice originalPrice={game.originalPrice} />   
                </Stack>
              </VStack>

              {/* GAME DISCOUNT */}
              <Discount discount={game.discount}/>
            </HStack>
          </>
        )}

        {/* MOBILE + TABLET BREAKPOINT */}
        { window.innerWidth < 786 && (
          <>
            <Image game={game} isSafari={isSafari}/>
            <GameName
              name={game.name}
              isSafari={isSafari}
              isMobile={isMobile}  
            />
            <VStack alignItems='flex-end'>
              <VStack gap='-1rem'>
                <CurrentPrice currentPrice={game.currentPrice} isSafari={isSafari}/>
                <OriginalPrice originalPrice={game.originalPrice} />
              </VStack>
              <Discount discount={game.discount}/>
            </VStack>
          </>
        )}
      </Card>
    </figure>
  )
}

export default ResultsCard