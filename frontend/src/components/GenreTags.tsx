import React from 'react'
import { Button, Box } from '@chakra-ui/react'

export default function GenreTags({ genres, setGenres } : { genres: string[], setGenres: React.Dispatch<React.SetStateAction<string[]>> }) {
  const genreFilters = [
    '2D',
    'Base Building',
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
  const handleGenreClick = (e: any): void => {
    const currentGenre = e.target.innerText

    if (e.target.classList.contains('genre-active')) {
      e.target.classList.remove('genre-active')
      
      setGenres(prevGenres => prevGenres.filter(genre => genre !== currentGenre))
    } else {
      e.target.classList.add('genre-active')
      e.target.style = {
        backgroundColor: 'green'
      }
      if (genres.length === 0) setGenres([currentGenre])
      else setGenres(prevGenres => [...prevGenres, currentGenre])
    }
  }

  // SET GENRE FILTER TAGS
  const genreTags = genreFilters.map(genre => {
    return (
      <Button
        key={`${genre}-search-genre-tag`} 
        as='button'
        className='search-genre-tag'
        onClick={handleGenreClick}
      >{genre}
      </Button>
    )
  })

  return (
    <div className='genre-filter-container'>
      <div>Select multiple: </div>
      <div className='genre-tags-container'>
        {genreTags}
      </div>
    </div>
  )
}
