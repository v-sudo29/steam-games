import { Checkbox } from "@chakra-ui/react";
import CheckboxIcon from "../../../../../assets/icons/CheckboxIcon";

interface CustomCheckboxProps {
  genre: string
  handleGenreClick: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

const CustomCheckbox = ({ genre, handleGenreClick } : CustomCheckboxProps) => {
  return (
    <Checkbox
      _checked={{
        "& .chakra-checkbox__control": { border: "1px solid #7E8B9B" }
      }}   
      transition="none"
      colorScheme='#14191F'
      icon={<CheckboxIcon/>}
      onChange={handleGenreClick} 
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