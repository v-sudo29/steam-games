import { Checkbox } from "@chakra-ui/react";
import { isSafari } from "react-device-detect";
import CheckboxIcon from "../assets/CheckboxIcon";

export default function CustomCheckbox({ genre, handleGenreClick } : { genre: string, handleGenreClick: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>}) {
  return (
    <Checkbox
      transition="none"
      colorScheme='#14191F'
      icon={<CheckboxIcon/>}
      onChange={(e) => handleGenreClick(e)} 
      className='search-genre-tag'
      value={genre}
      w='100%'
      mb={isSafari ? '0.5rem' : 0}
    >
      {genre}
    </Checkbox>
  )
}
