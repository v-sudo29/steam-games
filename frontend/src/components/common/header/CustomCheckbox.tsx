import { Checkbox } from "@chakra-ui/react";
import CheckboxIcon from "../../../assets/CheckboxIcon";
import { useGenres } from "../../../context/genresContext";

const CustomCheckbox = ({ genre }: { genre: string }) => {
  const { setGenres } = useGenres()

  // Handle genre tag click
  const handleGenreClick = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault()

    // Get filters container and checkboxes
    const filtersContainer = document.getElementById('filters') as HTMLFormElement
    const labelElements = filtersContainer.querySelectorAll('label')
    const selectedFilters: string[] = []

    // Push active filters to array
    labelElements.forEach(label => {
      const filterName = label.innerText
      const inputChecked = (label.querySelector('input') as HTMLInputElement).checked
      if (inputChecked) selectedFilters.push(filterName)
    })

    // Set genres state to selectedFilters array
    setGenres(selectedFilters)
  }

  return (
    <Checkbox
      transition="none"
      colorScheme='#14191F'
      icon={<CheckboxIcon/>}
      onChange={(e) => handleGenreClick(e)} 
      className='checkbox'
      value={genre}
      w='100%'
      mb='0.5rem'
    >
    {genre}
    </Checkbox>
  )
}

export default CustomCheckbox