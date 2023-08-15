import { 
  HStack,
  VStack
} from "@chakra-ui/react"

import GenreTags from "./GenreTags"
import Results from "./Results"
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
  setPaginationExpanded: React.Dispatch<React.SetStateAction<boolean>>
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
  setPaginationExpanded
} : ContentInterface) {

  return (
    <HStack 
      gap='1rem'
      mt='1rem'
      h='100%'
      w='100%'
      align='start'
    >
      <GenreTags 
        genres={genres}
        setGenres={setGenres}
        expanded={expanded}
      />
      <VStack 
        h='100%'
        w='100%'
        transition='margin-left 200ms ease'
        ml={expanded ? '17rem' : '0rem'}
      >
        <Results 
          gamesAreLoading={gamesAreLoading}
          gamesError={gamesError}
          gamesData={gamesData}
          genres={genres}
          sortList={sortList}
          currentResults={currentResults}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          gamesTabActive={gamesTabActive}
          wishlistData={wishlistData}
          wishlistLoading={wishlistLoading}
          wishlistError={wishlistError}
        />

        {(!gamesTabActive && wishlistData && wishlistData.length > 25) &&
          <PageNumbers 
            setPageNumber={setPageNumber}
            pageNumber={pageNumber} 
            currentResults={currentResults}
            gamesData={gamesData}
            genres={genres}
            paginationExpanded={paginationExpanded}
            setPaginationExpanded={setPaginationExpanded}
          />
        }

        {(gamesTabActive && gamesData && gamesData.length > 25) &&
          <PageNumbers 
            setPageNumber={setPageNumber}
            pageNumber={pageNumber} 
            currentResults={currentResults}
            gamesData={gamesData}
            genres={genres}
            paginationExpanded={paginationExpanded}
            setPaginationExpanded={setPaginationExpanded}
          />
         }
      </VStack>
    </HStack>
  )
}
