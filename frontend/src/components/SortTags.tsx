import React, { MouseEvent } from 'react'

export default function SortTags({ setSortList } : {  setSortList: React.Dispatch<React.SetStateAction<string[]>> }) {
  const sortFilters = [
    'Discount',
    'Current Price',
    'Rating',
    'Feedback',
  ]

  // FUNCTION: Handle sort clicks
  const handleSortClick = (e: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    const currentSortBtn = e.target as HTMLButtonElement
    const currentSortText = currentSortBtn.innerText
    const sortTags = document.querySelectorAll('.sorting-tag') as NodeListOf<HTMLButtonElement>
  
    if (currentSortBtn.classList.contains('sort-active')) {
      currentSortBtn.classList.remove('sort-active')
      setSortList([])
      sortTags.forEach(tag => tag.disabled = false)
    } else {
      currentSortBtn.classList.add('sort-active')
      setSortList([currentSortText])
      sortTags.forEach(tag => tag === currentSortBtn ? null : tag.disabled = true)
    }
  }

    // SET SORTING TAGS
    const sortingTags = sortFilters.map(sort => {
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
