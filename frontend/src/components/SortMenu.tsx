import { Box, Button, Select, VStack } from "@chakra-ui/react"
import CarrotDownIcon from "../assets/CarrotDownIcon"
import { useEffect, useRef, useState } from "react"
import { useSortList } from "../context/sortListContext"
import { useSearchParams } from "react-router-dom"
import { useSearch } from "../context/searchContext"
import { useGenres } from "../context/genresContext"

export default function SortMenu() {
  const [open, setOpen] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { sortList, setSortList } = useSortList()
  const { searchData, query } = useSearch()
  const { genres } = useGenres()
  const animateRef = useRef<boolean>()

  const selected = sortList[0]
  animateRef.current = open

  const options = [
    'Discount',
    'Rating',
    'Feedback',
    'Price'
  ]

  const selectedCard = (
    <Button
      id='selectedCard'
      as='div'
      pos='relative'
      w='inherit'
      onClick={() => setOpen(prev => !prev)}
      cursor='pointer'
      rightIcon={<CarrotDownIcon animate={open} setAnimate={setOpen}/>}
      fontWeight='600'
      border='none'
      borderRadius='0.4rem'
      color='#F5F5F5'
      bg='#2F3740'
      _hover={{ backgroundColor: '#3b454f' }}
    >
      {selected}
    </Button>
  )

  const handleSelection = (e: React.MouseEvent<HTMLDivElement>): void => {
    const divElement = e.target as HTMLDivElement
    const sortName = divElement.innerText
    setSortList([sortName])
    // SEARCH, FILTER, and SORT used 
    if (searchData && genres.length > 0 && sortList.length > 0) setSearchParams({ q: query, sort: sortName, filter: genres })

    // FILTER and SORT used
    if (!searchData && genres.length > 0 && sortList.length > 0) setSearchParams({ sort: sortName, filter: genres })

    // SORT used
    if (!searchData && genres.length === 0 && sortList.length > 0) setSearchParams({ sort: sortName })
    setOpen(false)
  }

  const closeSelectMenu = (e: MouseEvent): void => {
    const element = e.target as HTMLElement
    if (element.id !== 'selectedCard' && element.id !== 'carrotDown' && 
      !element.classList.contains('optionCard') && animateRef.current) setOpen(false)
  }

  const optionCards = options.map(option => {
    if (option === selected) return null
    return (
      <Box
        key={option}
        className='optionCard'
        onClick={(e) => handleSelection(e)}
        fontWeight='400'
        _hover={{ 
          background: '#3b454f',
          fontWeight: '600'
        }}
        cursor='pointer'
        w='inherit'
        p='0.4rem 1.4rem'
      >
        {option}
      </Box>
    )
  })

  useEffect(() => {
    document.addEventListener('mousedown', closeSelectMenu)
    return () => document.removeEventListener('mousedown', closeSelectMenu)
  }, [])

  return (
    <Box ml='auto' w='9rem
    '>
      <Select display='none'>
        <option>Discount</option>
        <option>Rating</option>
        <option>Feedback</option>
        <option>Price</option>
      </Select>
      {selectedCard}
      <VStack
        display={open ? 'flex' : 'none'}
        pos='absolute'
        zIndex='1'
        borderRadius='0.4rem'
        bg='rgba(47, 55, 64, 0.85)'
        w='inherit'
        mt='0.7rem'
        align='start'
        p='0.7rem 0rem'
        backdropFilter='auto'
        backdropBlur='5px'
        gap='0rem'
      >
        {optionCards}
      </VStack>
    </Box>
  )
}
