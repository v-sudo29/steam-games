import { Box, HStack, Link, Stack,} from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"
import { useMobile } from "../../../context/useMobileContext"
import LogoAndName from "../../../assets/logo/LogoAndName"
import SearchBar from "./SearchBar"
import openNewTab from "../../../helpers/openNewTab"

const Header = () => {
  const isMobile = useMobile()

  return (
    <header style={{ marginBottom: '3rem' }}>
      <HStack justify='space-between' gap='1rem'>
        
      {/* DESKTOP */}
      {!isMobile && (
        <>
          <Link onClick={() => localStorage.clear()} href='/'>
            <LogoAndName/>
          </Link>
          <section style={{ flexGrow: '3', display: 'flex', justifyContent: 'center' }}>
            <SearchBar/>
          </section>
          <Box
            tabIndex={0}
            border='none'
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
        </>
      )}
      </HStack>
    </header>
  )
}

export default Header