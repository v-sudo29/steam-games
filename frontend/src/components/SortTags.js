import React from 'react'

function SortTags({setSortList, sortFilters}) {

  const handleSortClick = (e) => {
    const currentSort = e.target
    const currentSortText = e.target.innerText
    const sortTags = document.querySelectorAll('.sorting-tag')
  
    if (e.target.classList.contains('sort-active')) {
      e.target.classList.remove('sort-active')
      setSortList([])
      sortTags.forEach(tag => tag.disabled = false)
    } else {
      e.target.classList.add('sort-active')
      setSortList([currentSortText])
      sortTags.forEach(tag => tag === currentSort ? null : tag.disabled = true)
    }
  }

    // SET SORTING TAGS
    const sortingTags = sortFilters.current.map(sort => {
      return (
        <button
          key={sort}
          type='button'
          className={`sorting-tag ${sort}`}
          onClick={(e) => handleSortClick(e)}
        >{sort}
        </button>
      )
    })

  return (
    <div className='sorting-container'>
      <div>Choose one only: </div>
      {sortingTags}
    </div>
  )
}

export default SortTags