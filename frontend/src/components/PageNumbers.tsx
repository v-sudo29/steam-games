import { Box, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { GameObject } from "../interface/GameObject"

export default function PageNumbers({ 
  pageNumber, 
  setPageNumber, 
  currentResults,
  genres
}: { 
  pageNumber: number, 
  setPageNumber:React.Dispatch<React.SetStateAction<number>>,
  currentResults: {current: any},
  gamesData: GameObject[] | null
  genres: string[]
}) 
{
  const [expanded, setExpanded] = useState<boolean>(false)
  const totalPages = currentResults.current && Math.ceil(currentResults.current.length / 25)
  let pagesJSX: JSX.Element[] = []

  function handleClick(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>): void {
    const pageElement = e.target as HTMLParagraphElement
    const number = parseInt(pageElement.innerText)
    const pageFive = 5
    const lastPageMinusFour = totalPages - 4

    setPageNumber(number)
    if (totalPages > 10 && (number === pageFive || number === lastPageMinusFour)) setExpanded(true)
    if (totalPages > 10 && (number < pageFive || number > lastPageMinusFour)) setExpanded(false)
  }

  function incrementPageNumber(): void {
    if (pageNumber === totalPages) return
    
    const number = pageNumber
    const pageFour = 4
    const lastPageMinusFour = totalPages - 4

    setPageNumber(prev => prev + 1)

    if (totalPages > 10 && (number === pageFour || number === lastPageMinusFour)) setExpanded(true)
    if (totalPages > 10 && (number >= lastPageMinusFour)) setExpanded(false)
  }
  
  function decrementPageNumber(): void {
    if (pageNumber === 1) return
    
    const number = pageNumber
    const pageFour = 4
    const pageFive = 5
    const lastPageMinusThree = totalPages - 3

    setPageNumber(prev => prev - 1)

    if (totalPages > 10 && (number === lastPageMinusThree || number === pageFour)) setExpanded(true)
    if (totalPages > 10 && (number <= pageFive)) setExpanded(false)
  }

  // Show FIRST 5 PAGES
  if (!expanded && totalPages !== 0 && pageNumber < 6) { 
    const pagesArr = []

    if (totalPages > 1 && totalPages < 6) {
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

    if (totalPages > 5) {
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
  if (!expanded && totalPages > 1 && ((pageNumber >= (totalPages - 5)) && (pageNumber <= totalPages))) {
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
  if (expanded) {
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
      {totalPages > 1 && 
        <Stack direction='row' gap='1rem' justify='end' align='center'>
          {(!expanded && pageNumber === 1) ? <Box fontSize='1.4rem' color='gray.300' cursor='default'>&#60;</Box> :
            <Box 
              fontSize='1.4rem'
              cursor='pointer'
              onClick={decrementPageNumber}
            >&#60;
            </Box>
          }

          {pagesJSX.length > 0 && pagesJSX}

          {(!expanded && pageNumber === totalPages) ? <Box fontSize='1.4rem' color='gray.300' cursor='default'>&#62;</Box> :
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
  )
}
