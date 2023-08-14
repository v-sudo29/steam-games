import openNewTab from '../hooks/openNewTab'
import { GameObject } from '../interface/GameObject'
import { 
  Card,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'

function ResultsCard({ game } : { game: GameObject }) {
  return (
    <Card 
      onClick={() => openNewTab(game.url)}
      flex='auto'
      overflow='hidden'
      // aspectRatio='8/5'
      variant='outline'
      direction='column'
      cursor='pointer'
      transition='ease 0.1s'
      _hover={{
        backgroundColor: '#2d3544'
      }}
      border='none'
      borderRadius='0.8rem'
      bg='#1C222C'
      color='#F5F5F5'
      p='1rem'
      gap='0.9rem'
    >
      <Image
        borderRadius='0.4rem'
        src={game.imgUrl} 
        alt={game.name} 
        aspectRatio={5/2}
        objectFit='cover'
        w='inherit'
      />

      {/* GAME INFO */}
      <HStack gap='1rem' align='start' h='100%'>

        {/* GAME TITLE AND CURRENT PRICE */}
        <VStack h='100%' w='100%' align='start'>
          <Heading fontSize='0.9rem' fontWeight='600'>{game.name}</Heading>
          <Stack w='100%' mt='auto' direction='row' align='center'>
            <Text fontWeight='bold' fontSize='1xl'>{game.currentPrice}</Text>
            <Text as='s' color='#5D6168' fontSize='0.8rem'>{game.originalPrice}</Text>          
          </Stack>
        </VStack>

        {/* GAME DISCOUNT */}
        <Stack textAlign='center' pos='relative' align='center' direction='row' w='3.5rem'>
          <Text p='0.1rem 0.2rem' w='inherit' borderRadius='0.3rem' color='#F5F5F5' bg='#2C984A' fontWeight='700'>{game.discount}</Text>
        </Stack>

      </HStack>
        
    </Card>
  )
}

export default ResultsCard