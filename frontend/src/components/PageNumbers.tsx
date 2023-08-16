import { Box, Stack, Text } from "@chakra-ui/react"
import { useDefaultData } from "../context/defaultDataContext"
import { useGenres } from "../context/GenresContext"
import { usePage } from "../context/pageContext"
import { useLocation } from "react-router-dom"

export default function PageNumbers() {
  const { currentResults } = useDefaultData()
  const { genres } = useGenres()
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

  // TODO: set up pagination logic for wishlistGames
  if (currentResults.current) totalPages = currentResults.current && Math.ceil(currentResults.current.length / 60)

  function handleClick(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>): void {
    const pageElement = e.target as HTMLParagraphElement
    const number = parseInt(pageElement.innerText)
    const pageFive = 5
    const lastPageMinusFour = totalPages - 4

    setPageNumber(number)

    if (totalPages > 10 && (number === pageFive || number === lastPageMinusFour)) setPaginationExpanded(true)
    if (totalPages > 10 && (number < pageFive || number > lastPageMinusFour)) setPaginationExpanded(false)
    window.scrollTo({top: 0})
  }

  function incrementPageNumber(): void {
    if (pageNumber === totalPages) return
    
    const number = pageNumber
    const pageFour = 4
    const lastPageMinusFour = totalPages - 4

    setPageNumber(prev => prev + 1)

    if (totalPages > 10 && (number === pageFour || number === lastPageMinusFour)) setPaginationExpanded(true)
    if (totalPages > 10 && (number >= lastPageMinusFour)) setPaginationExpanded(false)
  }
  
  function decrementPageNumber(): void {
    if (pageNumber === 1) return
    
    const number = pageNumber
    const pageFour = 4
    const pageFive = 5
    const lastPageMinusThree = totalPages - 3

    setPageNumber(prev => prev - 1)
    
    if (totalPages > 10 && (number === lastPageMinusThree || number === pageFour)) setPaginationExpanded(true)
    if (totalPages > 10 && (number <= pageFive)) setPaginationExpanded(false)
  }

  // Show FIRST 5 PAGES
  if (!paginationExpanded && totalPages !== 0 && pageNumber <= 10) { 
    const pagesArr = []

    if (totalPages > 1 && totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pagesArr.push(
          <Text 
            key={`${i}-first-pages`}
            onClick={(e) => handleClick(e)}
            className={i === pageNumber ? 'active-page' : ''}
            cursor={i !== pageNumber ? 'pointer' : 'default'} 
            fontSize='1.2rem'
          >{i}
          </Text>)
      }
    }

    if (totalPages > 10) {
      for (let i = 1; i <= totalPages; i++) {
        if (i < 6 || i === totalPages) pagesArr.push(
          <Text 
            key={`${i}-first-pages`}
            onClick={(e) => handleClick(e)}
            className={i === pageNumber ? 'active-page' : ''}
            cursor={i !== pageNumber ? 'pointer' : 'default'} 
            fontSize='1.2rem'
          >{i}
          </Text>)
        if (i === totalPages - 1) pagesArr.push(<Text key={`${i}-first-pages`}>...</Text>)
      }
    }

    pagesJSX = pagesArr
  }

  // Show LAST 5 PAGES
  if (!paginationExpanded && totalPages > 10 && ((pageNumber > (totalPages - 4)) && (pageNumber <= totalPages))) {
    const pagesArr = []

    for (let i = 1; i <= totalPages; i++) {
      if (i === totalPages - 5) pagesArr.push(<Text key={`${i}-last-pages`}>...</Text>)
      if (i === 1 || (i > (totalPages - 5) && i <= totalPages)) pagesArr.push(
        <Text 
          key={`${i}-last-pages`}
          onClick={(e) => handleClick(e)}
          className={i === pageNumber ? 'active-page' : ''}
          cursor={i !== pageNumber ? 'pointer' : 'default'} 
          fontSize='1.2rem'
        >{i}
        </Text>)
    }
    pagesJSX = pagesArr
  }

  // Show EXPANDED PAGES
  if (paginationExpanded) {
    const pagesArr = []

    for (let i = 1; i <=  totalPages; i++) {
      if (i === 2 || i === totalPages - 1) pagesArr.push(<Text key={`${i}-expanded-pages`}>...</Text>)
      if (i === 1 || i === totalPages || i === (pageNumber - 1) || i === pageNumber || i === (pageNumber + 1)) pagesArr.push(
        <Text 
          key={`${i}-expanded-pages-${genres}`}
          onClick={(e) => handleClick(e)}
          className={i === pageNumber ? 'active-page' : ''}
          cursor={i !== pageNumber ? 'pointer' : 'default'} 
          fontSize='1.2rem'
        >{i}
        </Text>
      )
    }
    pagesJSX = pagesArr
  }

  return (
    <>
      {location.pathname === '/all-games' && 
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
    </>
  )
}
