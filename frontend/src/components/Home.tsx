import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import { FaGithub } from 'react-icons/fa'
import { BsArrowRightShort } from 'react-icons/bs'
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()
  return (
    <VStack textAlign='center' mt='8rem' gap='2rem'>
      <Heading w='35rem' fontSize='5xl'>Find your next favorite game <Text color='#8439FF' as="span">on sale</Text></Heading>
      <Text w='35rem' fontSize='1.4rem' color='whiteAlpha.800'>Tired of missing out on Steam sales? Dideals does the hard work for you by collecting amazing discounted games in one spot.</Text>
      <HStack gap='1rem'>
        <Button
          onClick={() => navigate('/all-games')}
          rightIcon={<BsArrowRightShort style={{ marginLeft: '-0.3rem'}} size={30}/>}
          fontSize='1.1rem'
          p='1.6rem 1.6rem'
          bg='#8439FF'
          color='#F5F5F5'
          _hover={{ backgroundColor: '#6327c3'}}
          >
            View Deals
          </Button>
        <Button
          onClick={() => window.open('https://github.com/v-sudo29/steam_games','_blank')}
          leftIcon={<FaGithub size={22}/>}
          p='1.6rem 1.6rem'
          fontSize='1.1rem'
          _hover={{ backgroundColor: 'whiteAlpha.700'}}
          >
            GitHub
          </Button>
      </HStack>
    </VStack>
  )
}
