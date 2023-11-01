import { Button } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'

const GithubButton = ({ openGithubTab } : { openGithubTab: () => void }) => {
  return (
    <Button
      onClick={openGithubTab}
      border='none'
      leftIcon={<FaGithub size={22}/>}
      p='1.6rem 1.6rem'
      fontSize='1.1rem'
      _hover={{ backgroundColor: 'whiteAlpha.700'}}
    >
      GitHub
    </Button>
  )
}

export default GithubButton