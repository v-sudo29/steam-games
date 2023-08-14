import React, { useEffect } from 'react'
import { Checkbox, Stack } from '@chakra-ui/react'

export default function GenreTags(
  { genres, setGenres, setExpanded } : 
  { genres: string[], 
    setGenres: React.Dispatch<React.SetStateAction<string[]>>,
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>
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

  useEffect(() => setExpanded(false), [genres])

  // SET GENRE FILTER TAGS
  const genreTags = genreFilters.map(genre => {
    return (
      <Checkbox
        key={`${genre}-search-genre-tag`} 
        className='search-genre-tag'
        value={genre}
        onChange={(e) => handleGenreClick(e)}
      >{genre}
      </Checkbox>
    )
  })

  return (
    <Stack mt='4.5grem' ml='-15rem' p='1rem 3rem'>
      {genreTags}
    </Stack>
  )
}
