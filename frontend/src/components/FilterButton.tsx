import { Button } from "@chakra-ui/react"
import { useFilter } from "../context/filterContext"
import { useGenres } from "../context/genresContext"
import { isSafari } from "react-device-detect"
import FilterIcon from "../assets/FilterIcon"
import ExitIcon from "../assets/ExitIcon"

export default function FilterButton() {
  const { expanded, setExpanded } = useFilter()
  const { genres } = useGenres()

  const handleFilterBtnClick = () => setExpanded(prev => !prev)

  return (
    <Button
      onClick={handleFilterBtnClick}
      aria-expanded={expanded}
      aria-controls='filters'
      mr={isSafari ? '2rem' : 0}
      border='none'
      bg='#2F3740' 
      leftIcon={!expanded ? <FilterIcon/> : <ExitIcon/>}
      color='#F5F5F5'
      p='0rem 2rem'
      pr={genres.length > 0 ? '2rem' : '2rem'}
      _hover={{ backgroundColor: '#3b454f' }}
    >
      Filter {(genres.length > 0 && !expanded) && `(${genres.length})`}
    </Button>
  )
}
