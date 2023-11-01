import { Box, VStack } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { useSort } from "../../../../context/sortContext"
import { useSearchParams } from "react-router-dom"
import { useSearch } from "../../../../context/searchContext"
import { useGenres } from "../../../../context/genresContext"
import SelectedOption from "./SelectedOption"
import Option from "./Option"

const SortMenu = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { sort, setSort, sortOptions } = useSort()
  const { query } = useSearch()
  const { genres } = useGenres()
  const animateRef = useRef<boolean>()

  const selected = sort && sort[0]
  animateRef.current = open
  let optionCards
  let selectedCard

  // Handles user selecting a new sort
  const handleSelection = (e: React.MouseEvent<HTMLDivElement>): void => {
    const divElement = e.target as HTMLDivElement
    const sortName = divElement.innerText
    setSort([sortName])

    // SEARCH, FILTER, and SORT used 
    if (query && genres.length > 0 && sort.length > 0) setSearchParams({ q: query, sort: sortName, filter: genres })

    // FILTER and SORT used
    if (!query && genres.length > 0 && sort.length > 0) setSearchParams({ sort: sortName, filter: genres })

    // SORT used
    if (!query && genres.length === 0 && sort.length > 0) setSearchParams({ sort: sortName })
    setOpen(false)
  }

  // Handle opening sort menu
  const openSelectMenu = (): void => setOpen(true)

  // Handle closing sort menu
  const closeSelectMenu = (e: MouseEvent): void => {
    const element = e.target as HTMLElement
    if (element.id !== 'selectedCard' && element.id !== 'carrotDown' && 
      !element.classList.contains('optionCard') && animateRef.current) setOpen(false)
  }

  // Current selected sort option
  if (selected && selected.length > 1) {
    selectedCard = (
      <SelectedOption
        open={open}
        openSelectMenu={openSelectMenu}
        setOpen={setOpen}
        selected={selected}
      />
    )
  }

  // Other sort options not selected
  if (sortOptions) {
    optionCards = Object.values(sortOptions).map(option => {
      if (option === selected) return null
      return (
        <Option
          key={`${option}-sort-option`}
          option={option}
          handleSelection={handleSelection}
        />
      )
    })
  }

  // Close sort menu whenever user clicks outside of the sort menu
  useEffect(() => {
    document.addEventListener('mousedown', closeSelectMenu)
    return () => document.removeEventListener('mousedown', closeSelectMenu)
  }, [])

  return (
    <Box
      ml='auto'
      w='9rem'
      border='none'
      borderRadius='0.4rem'
    >
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

export default SortMenu