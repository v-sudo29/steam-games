import Header from "../components/Header"
import { Container } from "@chakra-ui/react"
import { useSearch } from "../context/searchContext"
import { useTabs } from "../context/tabsContext"
import { Outlet } from "react-router-dom"

export default function Layout() {
  const { setSearchData } = useSearch()
  const { setGamesTabActive, setWishlistTabActive } = useTabs()

  return (
    <Container
      minH='100vh'
      maxW='90vw'
      display='flex'
      flexDir='column'
      gap='1rem'
      padding='2rem 2rem'
      bg='#14191F'
      color='#F5F5F5'
    >
      <Header 
        setSearchData={setSearchData}
        setGamesTabActive={setGamesTabActive}
        setWishlistTabActive={setWishlistTabActive}
      />
      <Outlet/>
    </Container>
  )
}