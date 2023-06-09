import React from 'react'

function Results(props) {
  return (
    <div className='game-results'>
      {props.gamesAreLoading && <h1>...Loading</h1>}
      {props.gamesError && <h1>{props.gamesError}</h1>}
      {props.gamesData && <>{props.gameCards}</>}
    </div>
  )
}

export default Results