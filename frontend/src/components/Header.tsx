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
import axios from "axios"
import { useRef, useState } from "react"
import { GameObject } from "../interface/GameObject"

interface HeaderInterface {
  setSearchData: React.Dispatch<React.SetStateAction<GameObject[] | null>>,
  setGamesTabActive: React.Dispatch<React.SetStateAction<boolean>>,
  setWishlistTabActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ setSearchData, setGamesTabActive, setWishlistTabActive } : HeaderInterface) {
  const [emptyError, setEmptyError] = useState<boolean>(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && searchRef.current && searchRef.current.value !== '') {
        const searchParam = searchRef.current.value

        axios.get(`http://localhost:3001/search?q=${searchParam}`)
          .then(res => {
            setGamesTabActive(true)
            setSearchData(res.data)
            setWishlistTabActive(false)
          })
          .catch(err => console.error(err))
        return
    }
    if (e.key === 'Enter' && searchRef.current && searchRef.current.value === '') setEmptyError(true)      
  }
  
  return (
    <header style={{ marginBottom: '3rem' }}>
      <HStack justify='center'>
        <Box role='img' aria-label='Website logo'>
          <Link href='/'>
            <Logo/>
          </Link>
        </Box>
        <section
          style={{ flexGrow: '3' }}>
          <InputGroup role='search' display='flex' justifyContent='center'>
            <InputLeftElement
              role='presentation'
              pos='relative'
              className='InputLeft'
              pointerEvents='none'
              children={<SearchIcon/>}
            />
            <Input
              ref={searchRef}
              aria-label='search'
              pos='relative'
              fontFamily='Rubik'
              fontWeight='semibold'
              fontSize='0.9rem'
              placeholder='Search for games...'
              _placeholder={{ color: '#535B65'}}
              focusBorderColor={emptyError ? 'red.600' : '#F5F5F5'}
              border='none'
              bg='#2A3441'
              borderRadius='5rem'
              maxW='45rem'
              pl='3rem'
              onKeyDown={(e) => handleEnter(e)}
              onChange={() => {
                if ( searchRef.current && searchRef.current.value !== '' && emptyError) setEmptyError(false)
              }}
            />
          </InputGroup>
        </section>
      </HStack>
    </header>
  )
}
