import { 
  HStack,
} from "@chakra-ui/react"

import GenreTags from "./GenreTags"
import Results from "./Results"
import { GameObject } from "../interface/GameObject"

export default function Content(
  { genres,
    setGenres,
    gamesAreLoading,
    gamesError,
    gamesData,
    sortList,
    currentResults,
    pageNumber,
    setPageNumber,
    expanded
  } : 
  { genres: string[], 
    setGenres: React.Dispatch<React.SetStateAction<string[]>>,
    gamesAreLoading: boolean,
    gamesError: string | null,
    gamesData: GameObject[] | null,
    sortList: string[] ,
    currentResults: { current: GameObject[] | null },
    pageNumber: number,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>,
    expanded: boolean
  }) {
  return (
    <HStack gap='1rem' mt='1rem' h='100%' w='100%' align='start'>
      <GenreTags 
        genres={genres}
        setGenres={setGenres}
        expanded={expanded}
      />
      <Results 
        gamesAreLoading={gamesAreLoading}
        gamesError={gamesError}
        gamesData={gamesData}
        genres={genres}
        sortList={sortList}
        currentResults={currentResults}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </HStack>
  )
}
