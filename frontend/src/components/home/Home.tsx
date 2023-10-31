import { Heading, HStack, Text, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { isSafari } from "react-device-detect"
import { useMobile } from "../../context/useMobileContext"
import GithubButton from "./GithubButton"
import ViewDealsButton from "./ViewDealsButton"

const Home = () => {
  const navigate = useNavigate()
  const isMobile = useMobile()

  const openGithubTab = () => window.open('https://github.com/v-sudo29/steam-games','_blank')
  const navigateToDeals = () => navigate('/all-games')

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
        <GithubButton openGithubTab={openGithubTab}/>
        <ViewDealsButton navigateToDeals={navigateToDeals}/>
      </HStack>
    </VStack>
  )
}

export default Home