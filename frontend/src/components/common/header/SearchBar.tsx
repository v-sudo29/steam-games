import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text
} from "@chakra-ui/react"
import { useSearch } from "../../../context/searchContext"
import { useSearchParams } from "react-router-dom"
import { useTabs } from "../../../context/tabsContext"
import { useGenres } from "../../../context/genresContext"
import { useSort } from "../../../context/sortContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import SearchIcon from "../../../assets/icons/SearchIcon"
import ExitIcon from "../../../assets/icons/ExitIcon"

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { searchData, searchRef, query, setSearchData, setQuery } = useSearch()
  const { setGamesTabActive, setWishlistTabActive } = useTabs()
  const { sort } = useSort()
  const { genres } = useGenres()

  const navigate = useNavigate()
  const [emptyError, setEmptyError] = useState<boolean>(false)

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
            if (genres.length > 0 && sort.length > 0) setSearchParams({ q: searchParam, sort: sort, filter: genres })

            // FILTER used
            if (genres.length > 0 && sort.length === 0) setSearchParams({ q: searchParam, filter: genres })

            // SORT used
            if (genres.length === 0 && sort.length > 0) setSearchParams({ q: searchParam, sort: sort })
          })
          .catch(err => console.error(err))
        return
    }
    if (e.key === 'Enter' && searchRef.current && searchRef.current.value === '') setEmptyError(true)      
  }

  // Handle clear search
  const handleClearSearch = (): void => {
    setSearchData(null)
    setQuery(null)
    
    if (searchRef.current) searchRef.current.value = ''
    // Change url params to /all-games
    navigate('/all-games')
  }
  
  return (
    <InputGroup
      role='search'
      pos='relative'
      style={{
        left: '-1.2rem', // ChakraUI bug, paddingLeft: -3rem does not work
      }}
    >
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
          if (searchRef.current && searchRef.current.value !== '' && emptyError) setEmptyError(false)
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
  )
}

export default SearchBar