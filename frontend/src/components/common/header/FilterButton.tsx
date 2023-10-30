import { Button } from "@chakra-ui/react"
import { useFilter } from "../../../context/filterContext"
import { useGenres } from "../../../context/genresContext"
import { isSafari } from "react-device-detect"
import { useMobile } from "../../../context/useMobileContext"
import { useEffect } from "react"
import FilterIcon from "../../../assets/icons/FilterIcon"
import ExitIcon from "../../../assets/icons/ExitIcon"

const FilterButton = () => {
  const { expanded, setExpanded } = useFilter()
  const { genres } = useGenres()
  const isMobile = useMobile()
  
  const handleClick = (): void => setExpanded(prev => !prev)

  // Get expanded state from local storage if exists
  useEffect(() => {
    const urlParams = localStorage.getItem('storageObj')
    if (urlParams) {
      const parsedParams = JSON.parse(urlParams)
      const keys = Object.keys(parsedParams)
      if (keys.includes('expanded')) setExpanded(parsedParams.expanded)
    }
  }, [])

  return (
    <>
      {/* MOBILE */}
      {isMobile && 
        <Button
          onClick={handleClick}
          aria-expanded={expanded}
          aria-controls='filters'
          mr={isSafari ? '2rem' : 0}
          border='none'
          bg='#2F3740' 
          leftIcon={!expanded ? <FilterIcon/> : <ExitIcon/>}
          color='#F5F5F5'
          p='0rem 1.3rem'
          _hover={{ backgroundColor: '#3b454f' }}
          zIndex={expanded ? 20 : 0}
        >
          Filter {(genres && genres.length > 0 && !expanded) && `(${genres.length})`}
        </Button>
      }

      {/* DESKTOP */}
      {!isMobile && 
        <Button
          onClick={handleClick}
          aria-expanded={expanded}
          aria-controls='filters'
          mr={isSafari ? '2rem' : '-1rem'}
          border='none'
          bg='#2F3740' 
          leftIcon={!expanded ? <FilterIcon/> : <ExitIcon/>}
          color='#F5F5F5'
          p='0rem 2rem'
          pr={genres && genres.length > 0 ? '2rem' : '2rem'}
          _hover={{ backgroundColor: '#3b454f' }}
        >
          Filter {(genres && genres.length > 0 && !expanded) && `(${genres.length})`}
        </Button>
      }
    </>
  )
}

export default FilterButton