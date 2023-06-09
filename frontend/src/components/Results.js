import React from 'react'

function Results({gamesAreLoading, gamesError, gamesData, gameCards}) {
  return (
    <div className='game-results'>
      {gamesAreLoading && <h1>...Loading</h1>}
      {gamesError && <h1>{gamesError}</h1>}
      {gamesData && <>{gameCards}</>}
    </div>
  )
}

export default Results