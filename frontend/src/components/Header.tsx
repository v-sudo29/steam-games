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

export default function Header({ setSearchData } : { setSearchData: React.Dispatch<React.SetStateAction<GameObject[] | null>> }) {
  const [emptyError, setEmptyError] = useState<boolean>(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && searchRef.current && searchRef.current.value !== '') {
        const searchParam = searchRef.current.value

        axios.get(`http://localhost:3001/search?q=${searchParam}`)
          .then(res => setSearchData(res.data))
          .catch(err => console.error(err))
      }      
    }
  
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
            ref={searchRef}
            pos='relative'
            fontFamily='Rubik'
            fontWeight='semibold'
            fontSize='0.9rem'
            placeholder='Search for games...'
            _placeholder={{ color: '#535B65'}}
            _focus={{ color: '#F5F5F5' }}
            border='none'
            bg='#2A3441'
            borderRadius='5rem'
            maxW='45rem'
            pl='3rem'
            onKeyDown={(e) => handleEnter(e)}
          />
        </InputGroup>
      </HStack>
    </Box>
  )
}
