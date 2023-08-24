import { useEffect } from 'react'
import { VStack, Text, HStack, CheckboxGroup, Checkbox } from '@chakra-ui/react'
import { useGenres } from '../context/genresContext'
import { useFilter } from '../context/filterContext'
import { isSafari } from 'react-device-detect'
import { Form, useNavigate, useSearchParams  } from 'react-router-dom'
import { useSearch } from '../context/searchContext'
import { useSortList } from '../context/sortListContext'
import { useMobile } from '../context/useMobileContext'
import CustomCheckbox from './CustomCheckbox'

export default function GenreTags() {
  const { expanded } = useFilter()
  const { genres, setGenres, genreFilters } = useGenres()
  const { searchData, query } = useSearch()
  const { sortList } = useSortList()
  const [searchParams, setSearchParams] = useSearchParams()
  const isMobile = useMobile()

  const navigate = useNavigate()
  let genreTags: JSX.Element[] = []

  // Every time genres changes, update url params
  useEffect(() => {
    if (genres.length > 0) {

      // SEARCH, FILTER, and SORT used 
      if (query && genres.length > 0 && sortList.length > 0) setSearchParams({ q: query, sort: sortList, filter: genres })

      // FILTER and SORT used
      if (!query && genres.length > 0 && sortList.length > 0) setSearchParams({ sort: sortList, filter: genres })

      // SORT used
      if (!query && genres.length === 0 && sortList.length > 0) setSearchParams({ sort: sortList })
    }
  }, [genres])

  // Handle checkboxes reset
  const handleReset = (): void => {
    const formElement = document.querySelector('.form') as HTMLFormElement
    formElement.reset()
    setGenres([])
    if (location.pathname.includes('all-games')) navigate('/all-games')
    if (location.pathname.includes('wishlist')) navigate('/wishlist')

    // SEARCH and SORT used 
    if (query && genres.length > 0 && sortList.length > 0) setSearchParams({ q: query, sort: sortList})

    // SORT used
    if (!query && genres.length > 0 && sortList.length > 0) setSearchParams({ sort: sortList })
  }

  // SET GENRE FILTER TAGS
  genreTags = genreFilters.map(genre => <CustomCheckbox key={`${genre}-genre-tag`} genre={genre}/>)

  return (
    <VStack 
      pos='absolute'
      opacity={expanded ? '100%' : '0%'}
      minW='12rem' 
      maxW='17rem'
      align='start'
      transition='all 200ms ease'
      ml={isMobile ? '1rem' : ''}
    >
      <HStack gap='1rem'>
        <Text mb={isSafari ? '1.5rem' : '1rem'} fontWeight='600' color='#888888'>Select filters</Text>
        {genres.length > 0 && 
          <Text
            onClick={handleReset}
            cursor='pointer'
            mb={isSafari ? '1.5rem' : '1rem'}
            fontWeight='600'
            color='#F5F5F5'
            ml={isSafari ? '1rem' : '0rem'}
          >
            Clear
          </Text>
        }
      </HStack>
      <Form id='filters' className='form' role="group" aria-label="Filter Options">
        {(!isSafari && genres.length > 0) ?
          <CheckboxGroup defaultValue={genres}>
            {genreTags}
          </CheckboxGroup> :
          <>{genreTags}</>
        }
        {(isSafari && genres.length > 0) && // TODO: filters not persisting after refresh in Safari
          <CheckboxGroup defaultValue={genres}>
            {genreTags}
          </CheckboxGroup>
        }
      </Form>
    </VStack> 
  )
}
