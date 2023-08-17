import React from 'react'
import { VStack, Text, HStack } from '@chakra-ui/react'
import { useGenres } from '../context/genresContext'
import { useFilter } from '../context/filterContext'
import { isSafari } from 'react-device-detect'
import { Form } from 'react-router-dom'
import CustomCheckbox from './CustomCheckbox'

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
  let genreTags: JSX.Element[] = []

  // Handle genre tag click -- TODO: remove classlist
  const handleGenreClick = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault()
    const currentGenre = e.target as HTMLInputElement

    if (currentGenre.classList.contains('genre-active')) {
      currentGenre.classList.remove('genre-active')
      if (genres.length === 1) setGenres([])
      else setGenres(prevGenres => prevGenres.filter(genre => genre !== currentGenre.value))
    } 
    else {
      currentGenre.classList.add('genre-active')
      if (genres.length === 0) setGenres([currentGenre.value])  
      else setGenres(prevGenres => [...prevGenres, currentGenre.value])
    }
  }

  const handleReset = (): void => {
    const formElement = document.querySelector('.form') as HTMLFormElement
    formElement.reset()
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
        minW='17rem' 
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
        <Form className='form'>
          {genreTags}
        </Form>
      </VStack> 
    </>
  )
}
