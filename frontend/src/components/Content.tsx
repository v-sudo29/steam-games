import { 
  HStack,
  VStack,
  Text
} from "@chakra-ui/react"

import GenreTags from "./GenreTags"

export default function Content(
  { genres, setGenres, setExpanded } : 
  { genres: string[], 
    setGenres: React.Dispatch<React.SetStateAction<string[]>>,
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>
  }) {
  return (
    <HStack mt='1rem'>
      <GenreTags 
        genres={genres}
        setGenres={setGenres}
        setExpanded={setExpanded}
      />
    </HStack>
  )
}
