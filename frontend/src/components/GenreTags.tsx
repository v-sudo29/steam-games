import React, { useEffect } from 'react'
import { VStack, Text, HStack } from '@chakra-ui/react'
import { useGenres } from '../context/genresContext'
import { useFilter } from '../context/filterContext'
import { isSafari } from 'react-device-detect'
import { Form } from 'react-router-dom'
import CustomCheckbox from './CustomCheckbox'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function GenreTags() {
  const genreFilters = [
    '2D',
    'Base Building',
    'Card Game',
    'Colony Sim',
    'Cute',
    'Farming',
    'Farming Sim',
    'Indie',
    'Life Sim',
    'Pixel Graphics',
    'Platformer'
  ]
  const { expanded } = useFilter()
  const { genres, setGenres } = useGenres()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  let genreTags: JSX.Element[] = []

  // Every time genres changes, update url params
  useEffect(() => {
    if (genres.length > 0) {

      // Set search params to genres
      setSearchParams({ filter: genres})
    }

  }, [genres])

  // Handle genre tag click
  const handleGenreClick = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault()

    // Get filters container and checkboxes
    const filtersContainer = document.getElementById('filters') as HTMLFormElement
    const labelElements = filtersContainer.querySelectorAll('label')
    const selectedFilters: string[] = []

    // Push active filters to array
    labelElements.forEach(label => {
      const filterName = label.innerText
      const inputChecked = (label.querySelector('input') as HTMLInputElement).checked
      if (inputChecked) selectedFilters.push(filterName)
    })

    // Set genres state to selectedFilters array
    setGenres(selectedFilters)
  }

  const handleReset = (): void => {
    const formElement = document.querySelector('.form') as HTMLFormElement
    formElement.reset()
    setGenres([])
    if (location.pathname.includes('all-games')) navigate('/all-games')
    if (location.pathname.includes('wishlist')) navigate('/wishlist')
  }

  // SET GENRE FILTER TAGS
  genreTags = genreFilters.map(genre => {
    return (
      <CustomCheckbox
        key={`${genre}-genre-tag`}
        genre={genre}
        handleGenreClick={(e) => handleGenreClick(e)}
      />
    )
  })

  return (
    <>
      <VStack 
        pos='absolute'
        opacity={expanded ? '100%' : '0%'}
        minW='12rem' 
        maxW='17rem'
        align='start'
        transition='all 200ms ease'
      >
        <HStack gap='1rem'>
          <Text mb={isSafari ? '1.5rem' : '1rem'} fontWeight='600' color='#888888'>Select filters</Text>
          {genres.length > 0 && 
            <Text
              onClick={handleReset}
              cursor='pointer'
              mb={isSafari ? '1.5rem' : '1rem'}
              fontWeight='600'
              color='#F5F5F5'
            >
              Clear
            </Text>
          }
        </HStack>
        <Form id='filters' className='form' role="group" aria-label="Filter Options">
          {genreTags}
        </Form>
      </VStack> 
    </>
  )
}
