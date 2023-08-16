import { 
  HStack,
  VStack
} from "@chakra-ui/react"

import GenreTags from "./GenreTags"
import Results from "./AllGamesCards"
import PageNumbers from "./PageNumbers"
import { GameObject } from "../interface/GameObject"

interface ContentInterface {
  genres: string[], 
  setGenres: React.Dispatch<React.SetStateAction<string[]>>,
  gamesAreLoading: boolean,
  gamesError: string | null,
  gamesData: GameObject[] | null,
  sortList: string[] ,
  currentResults: { current: GameObject[] | null },
  pageNumber: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  expanded: boolean,
  gamesTabActive: boolean,
  wishlistData: GameObject[] | null,
  wishlistError: string | null,
  wishlistLoading: boolean,
  paginationExpanded: boolean,
  setPaginationExpanded: React.Dispatch<React.SetStateAction<boolean>>,
  searchData: GameObject[] | null,
  setSearchData: React.Dispatch<React.SetStateAction<GameObject[] | null>>
}

export default function Content({
  genres,
  setGenres,
  gamesAreLoading,
  gamesError,
  gamesData,
  sortList,
  currentResults,
  pageNumber,
  setPageNumber,
  expanded,
  gamesTabActive,
  wishlistData,
  wishlistLoading,
  wishlistError,
  paginationExpanded,
  setPaginationExpanded,
  searchData,
  setSearchData
} : ContentInterface) {

  return (
    <HStack 
      gap='1rem'
      mt='1rem'
      h='100%'
      w='100%'
      align='start'
    >
      <GenreTags />
      <VStack 
        h='100%'
        w='100%'
        transition='margin-left 200ms ease'
        ml={expanded ? '17rem' : '0rem'}
      >
        <Results/>

        {(!gamesTabActive && wishlistData && wishlistData.length > 25) &&
          <PageNumbers />
        }

        {(gamesTabActive && gamesData && gamesData.length > 25) &&
          <PageNumbers />
         }
      </VStack>
    </HStack>
  )
}
