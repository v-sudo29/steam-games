import React, { useEffect } from 'react'
import { Checkbox, VStack, Text } from '@chakra-ui/react'

export default function GenreTags(
  { genres, setGenres, expanded } : 
  { genres: string[], 
    setGenres: React.Dispatch<React.SetStateAction<string[]>>,
    expanded: boolean
  }) {
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

  // Handle genre tag click
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

  // SET GENRE FILTER TAGS
  const genreTags = genreFilters.map(genre => {
    return (
      <Checkbox
        w='100%'
        key={`${genre}-search-genre-tag`} 
        className='search-genre-tag'
        value={genre}
        onChange={(e) => handleGenreClick(e)}
      >{genre}
      </Checkbox>
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
        <Text mb='1rem' fontWeight='600' color='#888888'>Select filters</Text>
        {genreTags}
      </VStack> 
    </>
  )
}
