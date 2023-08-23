import { Box, HStack, Link,} from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"
import Logo from "../assets/LogoAndName"
import SearchBar from "./SearchBar"
import openNewTab from "../hooks/openNewTab"

export default function Header() {
  return (
    <header style={{ marginBottom: '3rem' }}>
      <HStack justify='space-between' gap='1rem'>
        <Link onClick={() => localStorage.clear()} href='/'>
          <Logo/>
        </Link>
        <section style={{ flexGrow: '3', display: 'flex', justifyContent: 'center' }}>
          <SearchBar/>
        </section>
        <Box
          tabIndex={0}
          as='button'
          cursor='pointer'
          onClick={() => openNewTab('https://github.com/v-sudo29/steam_games')}
          transition='color 200ms ease'
          _hover={{ color: '#9b9b9b' }}
          _focusVisible={{
            outline: '3px solid #3D668F'
          }}
        >
          <FaGithub size={25}/>
        </Box>  
      </HStack>
    </header>
  )
}
