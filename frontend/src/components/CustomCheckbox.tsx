import { Checkbox } from "@chakra-ui/react";
import CheckboxIcon from "../assets/CheckboxIcon";

export default function CustomCheckbox({ genre, handleGenreClick} : { genre: string, handleGenreClick: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void> }) {
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
