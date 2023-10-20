import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import { FaGithub } from 'react-icons/fa'
import { BsArrowRightShort } from 'react-icons/bs'
import { useNavigate } from "react-router-dom"
import { isSafari } from "react-device-detect"
import { useMobile } from "../../context/useMobileContext"

const Home = () => {
  const navigate = useNavigate()
  const isMobile = useMobile()

  return (
    <VStack textAlign='center' mt='8rem' gap='2rem'>
      <Heading maxW='35rem' fontSize='5xl' px='1rem'>
        <div>Find your next </div>
        <span> favorite game</span>
        <Text color='#8439FF' as="span"> on sale</Text>
      </Heading>

      {/* DESKTOP - include hero caption*/}
      {!isMobile && (
        <Text
          mb={isSafari ? '2rem' : 0}
          mt={isSafari ? '2rem' : 0}
          w='35rem'
          fontSize='1.4rem'
          color='whiteAlpha.800'
        >
          Tired of missing out on Steam sales? Dideals does the hard work for you by collecting amazing discounted games in one spot.
        </Text>
      )}

      <HStack gap='1rem' flexWrap='wrap' justifyContent='center'>
        <Button
          onClick={() => window.open('https://github.com/v-sudo29/steam-games','_blank')}
          border='none'
          leftIcon={<FaGithub size={22}/>}
          p='1.6rem 1.6rem'
          fontSize='1.1rem'
          _hover={{ backgroundColor: 'whiteAlpha.700'}}
        >
          GitHub
        </Button>
        <Button
          className="view-deals-button"
          onClick={() => navigate('/all-games')}
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
      </HStack>
    </VStack>
  )
}

export default Home