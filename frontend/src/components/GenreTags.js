import React from 'react'

function GenreTags({genreFilters, genres, setGenres}) {

  // FUNCTION: Handle genre tag click
  const handleGenreClick = (e) => {
    const currentGenre = e.target.innerText

    if (e.target.classList.contains('genre-active')) {
      e.target.classList.remove('genre-active')
      setGenres(prevGenres => {
        return prevGenres.filter(genre => genre !== currentGenre ? genre : null)
      })
    } else {
      e.target.classList.add('genre-active')

      if (genres.length === 0) {
        setGenres([currentGenre])
      } else {
        setGenres(prevGenres => [...prevGenres, currentGenre])
      }
    }
  }

  // SET GENRE FILTER TAGS
  const genreTags = genreFilters.current.map(genre => {
    return (
      <button 
        key={`${genre}-search-genre-tag`} 
        type='button'
        className='search-genre-tag'
        onClick={handleGenreClick}
      >{genre}
      </button>
    )
  })

  return (
    <div className='genre-filter-container'>
      <div>Select multiple: </div>
      {genreTags}
    </div>
  )
}

export default GenreTags