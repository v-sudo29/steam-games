import { Box, Stack, Text } from "@chakra-ui/react"
import { useDefaultData } from "../../../context/defaultDataContext"
import { usePage } from "../../../context/pageContext"
import { useLocation } from "react-router-dom"
import PageNumber from "./page-number/PageNumber"

const Pagination = () => {
  const { currentResults, wishlistData } = useDefaultData()
  const { 
    pageNumber, 
    pageNumberWL, 
    setPageNumber,
    setPageNumberWL,
    paginationExpanded, 
    paginationExpandedWL, 
    setPaginationExpanded,
    setPaginationExpandedWL,
  } = usePage()
  const location = useLocation()
  let totalPages: number = 0
  let pagesJSX: JSX.Element[] = []

  // Handle user clicking on numbers
  function handleClick(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>): void {
    const pageElement = e.target as HTMLParagraphElement
    const number = parseInt(pageElement.innerText)
    const pageFive = 5
    const lastPageMinusFour = totalPages - 4

    if (location.pathname.includes('all-games')) {
      setPageNumber(number)
      if (totalPages > 10 && (number === pageFive || number === lastPageMinusFour)) setPaginationExpanded(true)
      if (totalPages > 10 && (number < pageFive || number > lastPageMinusFour)) setPaginationExpanded(false)
    }

    if (location.pathname.includes('wishlist')) {
      setPageNumberWL(number)
      if (totalPages > 10 && (number === pageFive || number === lastPageMinusFour)) setPaginationExpandedWL(true)
      if (totalPages > 10 && (number < pageFive || number > lastPageMinusFour)) setPaginationExpandedWL(false)
    }
    window.scrollTo({ top: 0 })
  }

  // Handles user incrementing page number clicking on right carrot
  function incrementPageNumber(): void {
    if (location.pathname.includes('all-games')) {
      if (pageNumber === totalPages) return
      const number = pageNumber
      const pageFour = 4
      const lastPageMinusFour = totalPages - 4

      setPageNumber(prev => prev + 1)
      if (totalPages > 10 && (number === pageFour || number === lastPageMinusFour)) setPaginationExpanded(true)
      if (totalPages > 10 && (number >= lastPageMinusFour)) setPaginationExpanded(false)
      return
    }

    if (location.pathname.includes('wishlist')){
      if (pageNumberWL === totalPages) return
      const number = pageNumber
      const pageFour = 4
      const lastPageMinusFour = totalPages - 4

      setPageNumberWL(prev => prev + 1)
      if (totalPages > 10 && (number === pageFour || number === lastPageMinusFour)) setPaginationExpandedWL(true)
      if (totalPages > 10 && (number >= lastPageMinusFour)) setPaginationExpandedWL(false)
      return
    }
  }
  
  // Handles user decrementing page number clicking on left carrot
  function decrementPageNumber(): void {
    if (location.pathname.includes('all-games')) {
      if (pageNumber === 1) return
      const number = pageNumber
      const pageFour = 4
      const pageFive = 5
      const lastPageMinusThree = totalPages - 3
  
      setPageNumber(prev => prev - 1)
      if (totalPages > 10 && (number === lastPageMinusThree || number === pageFour)) setPaginationExpanded(true)
      if (totalPages > 10 && (number <= pageFive)) setPaginationExpanded(false)
      return
    }

    if (location.pathname.includes('wishlist')) {
      if (pageNumberWL === 1) return
      const number = pageNumber
      const pageFour = 4
      const pageFive = 5
      const lastPageMinusThree = totalPages - 3
  
      setPageNumberWL(prev => prev - 1)
      if (totalPages > 10 && (number === lastPageMinusThree || number === pageFour)) setPaginationExpandedWL(true)
      if (totalPages > 10 && (number <= pageFive)) setPaginationExpandedWL(false)
      return
    }
  }

  // Calculate total pages or wishlist games or all-games depending on url pathname
  if (location.pathname.includes('wishlist') && wishlistData) {
    totalPages = Math.ceil(wishlistData.length / 60)
  }
  if (location.pathname.includes('all-games') && currentResults.current) {
    totalPages =  Math.ceil(currentResults.current.length / 60)
  }

  // Show FIRST 5 page numbers if url pathname has all-games
  if (location.pathname.includes('all-games') && !paginationExpanded && totalPages !== 0 && pageNumber <= 10) { 
    const pagesArr = []

    if (totalPages > 1 && totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pagesArr.push(
          <PageNumber
            key={`${i}-first-pages`}
            i={i} pageNumber={pageNumber}
            handleClick={handleClick}
          />
        )
      }
    }

    if (totalPages > 10) {
      for (let i = 1; i <= totalPages; i++) {
        if (i < 6 || i === totalPages) pagesArr.push(
          <PageNumber
            key={`${i}-first-pages`}
            i={i} pageNumber={pageNumber}
            handleClick={handleClick}
          />
        )
        if (i === totalPages - 1) pagesArr.push(<Text key={`${i}-first-pages`}>...</Text>)
      }
    }
    pagesJSX = pagesArr
  }

  // Show FIRST 5 page numbers if url pathname has wishlist
  if (location.pathname.includes('wishlist') && !paginationExpandedWL && totalPages !== 0 && pageNumberWL <= 10) { 
    const pagesArr = []

    if (totalPages > 1 && totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pagesArr.push(
          <PageNumber
            key={`${i}-first-pages-WL`}
            i={i} pageNumber={pageNumberWL}
            handleClick={handleClick}
          />
        )
      }
    }

    if (totalPages > 10) {
      for (let i = 1; i <= totalPages; i++) {
        if (i < 6 || i === totalPages) pagesArr.push(
          <PageNumber
            key={`${i}-first-pages-WL`}
            i={i} pageNumber={pageNumberWL}
            handleClick={handleClick}
          />
        )
        if (i === totalPages - 1) pagesArr.push(<Text key={`${i}-first-pages`}>...</Text>)
      }
    }
    pagesJSX = pagesArr
  }

  // Show LAST 5 page numbers if url pathname has all-games
  if (location.pathname.includes('all-games') && !paginationExpanded && totalPages > 10 && ((pageNumber > (totalPages - 4)) && (pageNumber <= totalPages))) {
    const pagesArr = []

    for (let i = 1; i <= totalPages; i++) {
      if (i === totalPages - 5) pagesArr.push(<Text key={`${i}-last-pages`}>...</Text>)
      if (i === 1 || (i > (totalPages - 5) && i <= totalPages)) pagesArr.push(
        <PageNumber
          key={`${i}-last-pages`}
          i={i} pageNumber={pageNumber}
          handleClick={handleClick}
        />
      )
    }
    pagesJSX = pagesArr
  }

  // Show LAST 5 page numbers if url pathname has wishlist
  if (location.pathname.includes('wishlist') && !paginationExpandedWL && totalPages > 10 && ((pageNumberWL > (totalPages - 4)) && (pageNumberWL <= totalPages))) {
    const pagesArr = []

    for (let i = 1; i <= totalPages; i++) {
      if (i === totalPages - 5) pagesArr.push(<Text key={`${i}-last-pages`}>...</Text>)
      if (i === 1 || (i > (totalPages - 5) && i <= totalPages)) pagesArr.push(
        <PageNumber
          key={`${i}-last-pages-WL`}
          i={i} pageNumber={pageNumberWL}
          handleClick={handleClick}
        />
      )
    }
    pagesJSX = pagesArr
  }

  // Show EXPANDED page numbers if url pathname has all-games
  if (location.pathname.includes('all-games') && paginationExpanded) {
    const pagesArr = []

    for (let i = 1; i <=  totalPages; i++) {
      if (i === 2 || i === totalPages - 1) pagesArr.push(<Text key={`${i}-expanded-pages`}>...</Text>)
      if (i === 1 || i === totalPages || i === (pageNumber - 1) || i === pageNumber || i === (pageNumber + 1)) pagesArr.push(
        <PageNumber
          key={`${i}-expanded-pages`}
          i={i} pageNumber={pageNumberWL}
          handleClick={handleClick}
        />
      )
    }
    pagesJSX = pagesArr
  }
  if (location.pathname.includes('wishlist') && paginationExpandedWL) {
    const pagesArr = []

    for (let i = 1; i <=  totalPages; i++) {
      if (i === 2 || i === totalPages - 1) pagesArr.push(<Text key={`${i}-expanded-pages`}>...</Text>)
      if (i === 1 || i === totalPages || i === (pageNumber - 1) || i === pageNumber || i === (pageNumber + 1)) pagesArr.push(
        <PageNumber
          key={`${i}-expanded-pages-WL`}
          i={i} pageNumber={pageNumberWL}
          handleClick={handleClick}
        />
      )
    }
    pagesJSX = pagesArr
  }

  return (
    <>
    {/* Render carrots if pathname is ALL-GAMES */}
      {location.pathname.includes('all-games') && 
        <>
          {totalPages > 1 && 
            <Stack direction='row' gap='1rem' justify='end' align='center'>
              {(!paginationExpanded && pageNumber === 1) ? <Box fontSize='1.4rem' color='gray.300' cursor='default'>&#60;</Box> :
                <Box 
                  fontSize='1.4rem'
                  cursor='pointer'
                  onClick={decrementPageNumber}
                >&#60;
                </Box>
              }

              {pagesJSX.length > 0 && pagesJSX}

              {(!paginationExpanded && pageNumber === totalPages) ? <Box fontSize='1.4rem' color='gray.300' cursor='default'>&#62;</Box> :
                <Box 
                  fontSize='1.4rem' 
                  cursor='pointer'
                  onClick={incrementPageNumber}
                >&#62;
                </Box>
              }
            </Stack>
          }  
        </>
      }

      {/* Render increment and decrement carrots if pathname is WISHLIST */}
      {location.pathname.includes('wishlist') &&
      <>
        {totalPages > 1 && 
          <Stack direction='row' gap='1rem' justify='end' align='center'>
            {(!paginationExpandedWL && pageNumberWL === 1) ? <Box fontSize='1.4rem' color='gray.300' cursor='default'>&#60;</Box> :
              <Box 
                fontSize='1.4rem'
                cursor='pointer'
                onClick={decrementPageNumber}
              >&#60;
              </Box>
            }

            {pagesJSX.length > 0 && pagesJSX}

            {(!paginationExpandedWL && pageNumberWL === totalPages) ? <Box fontSize='1.4rem' color='gray.300' cursor='default'>&#62;</Box> :
              <Box 
                fontSize='1.4rem' 
                cursor='pointer'
                onClick={incrementPageNumber}
              >&#62;
              </Box>
            }
          </Stack>
        }  
      </>
      }
    </>
  )
}

export default Pagination