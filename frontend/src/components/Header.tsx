import { 
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  HStack
 } from "@chakra-ui/react"

import Logo from "../assets/Logo"
import SearchIcon from "../assets/SearchIcon"

export default function Header() {
  return (
    <Box mb='3rem'>
      <HStack justify='center'>
        <Link href='/' flexGrow='5'>
          <Logo/>
        </Link>
        <InputGroup 
          display='flex'
          justifyContent='center'
        >
          <InputLeftElement
            pos='relative'
            className='InputLeft'
            pointerEvents='none'
            children={<SearchIcon/>}
          />
          <Input 
            pos='relative'
            fontFamily='Rubik'
            fontWeight='semibold'
            fontSize='0.9rem'
            placeholder='Search for games...'
            _placeholder={{ color: '#535B65'}}
            border='none'
            bg='#2A3441'
            borderRadius='5rem'
            maxW='45rem'
            pl='3rem'
          />
        </InputGroup>
      </HStack>
    </Box>
  )
}
