import { 
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  HStack,
  InputRightElement,
  Text
 } from "@chakra-ui/react"

import { FaGithub } from "react-icons/fa"
import Logo from "../assets/Logo"
import SearchIcon from "../assets/SearchIcon"
import ExitIcon from "../assets/ExitIcon"
import axios from "axios"
import { useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSearch } from "../context/searchContext"
import { useTabs } from "../context/tabsContext"
import { useSortList } from "../context/sortListContext"
import { useGenres } from "../context/genresContext"

export default function Header() {
  const [emptyError, setEmptyError] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { searchData, setSearchData, query, setQuery } = useSearch()
  const { setGamesTabActive, setWishlistTabActive } = useTabs()
  const { sortList } = useSortList()
  const { genres } = useGenres()

  const searchRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // Handle search when 'Enter' key is pressed
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && searchRef.current && searchRef.current.value !== '') {
        const searchParam = searchRef.current.value
        axios.get(`https://steam-games-server.onrender.com/search?q=${searchParam}`)
          .then(res => {
            navigate('/all-games')
            setGamesTabActive(true)
            setSearchData(res.data)
            setWishlistTabActive(false)
            setQuery(searchParam)

            // FILTER and SORT used 
            if (genres.length > 0 && sortList.length > 0) setSearchParams({ q: searchParam, sort: sortList, filter: genres })

            // FILTER used
            if (genres.length > 0 && sortList.length === 0) setSearchParams({ q: searchParam, filter: genres })

            // SORT used
            if (genres.length === 0 && sortList.length > 0) setSearchParams({ q: searchParam, sort: sortList  })
          })
          .catch(err => console.error(err))
        return
    }
    if (e.key === 'Enter' && searchRef.current && searchRef.current.value === '') setEmptyError(true)      
  }

  // Handle clear search
  const handleClearSearch = (): void => {
    setSearchData(null)
    if (searchRef.current) searchRef.current.value = ''

    // Change url params to /all-games
    navigate('/all-games')
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
          <InputGroup maxW='45rem' role='search' display='flex' justifyContent='center'>
            <InputLeftElement
              role='presentation'
              pos='relative'
              className='InputLeft'
              pointerEvents='none'
              children={<SearchIcon/>}
            />
            <Input
              ref={searchRef}
              pos='relative'
              aria-label='search'
              fontFamily='Rubik'
              fontWeight='semibold'
              fontSize='0.9rem'
              placeholder='Search for games...'
              _placeholder={{ color: '#535B65'}}
              _focus={{
                backgroundColor: '#E2E4E9',
                color: '#41464B',
                _placeholder: {
                  color: '#7E828B'
                }
              }}
              focusBorderColor={emptyError ? 'red.600' : '#F5F5F5'}
              border='none'
              bg='#2A3441'
              borderRadius='5rem'
              pl='3rem'
              onKeyDown={(e) => handleEnter(e)}
              onChange={() => {
                if ( searchRef.current && searchRef.current.value !== '' && emptyError) setEmptyError(false)
              }}
            />
            {searchData && (
              <InputRightElement
                display='flex'
                justifyContent='end'
                w='inherit'
                pointerEvents='none'
              >
                <HStack
                  bg='#8439FF'
                  borderRadius='10rem'
                  p='0.25rem 1rem'
                  mr='0.3rem'
                  pointerEvents='visible'
                >
                  <Text fontWeight='700'>{searchData && query}</Text>
                  <Box onClick={handleClearSearch} cursor='pointer'><ExitIcon size={16}/></Box>
                </HStack>
              </InputRightElement>
            )}
          </InputGroup>
        </section>
        <Box
          cursor='pointer'
          onClick={() => window.open('https://github.com/v-sudo29/steam_games','_blank')}
          transition='color 200ms ease'
          _hover={{
            color: '#9b9b9b'
          }}
        >
          <FaGithub size={25}/>
        </Box>  
      </HStack>
    </header>
  )
}
