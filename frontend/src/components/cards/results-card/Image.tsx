import { Image as ChakraImage } from '@chakra-ui/react'
import { GameObject } from '../../../interface/GameObject'

interface ImageProps {
  game: GameObject
  isSafari: boolean
}

const Image = ({ game, isSafari } : ImageProps) => {
  return (
    <ChakraImage
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
  )
}

export default Image