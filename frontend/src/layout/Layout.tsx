import Header from "../components/common/header/Header"
import { Box, Container } from "@chakra-ui/react"
import { Outlet, useSearchParams } from "react-router-dom"
import { useMobile } from "../context/useMobileContext"
import { useEffect } from "react"
import SearchBar from "../components/common/header/SearchBar"
import Background from '../assets/images/home-background.png'

export default function Layout() {
  const isMobile = useMobile()

  // Clear local storage when user exits app
  useEffect(() => {
    return () => localStorage.clear()
  }, [])

  return (
    <Container
      display='flex'
      minH='100vh'
      minW='0vw'
      maxW={!isMobile ? '90vw' : '100vw'}
      w='400rem'
      flexDir='column'
      gap='1rem'
      padding={!isMobile ? '2rem 2rem' : '2rem 0rem'}
      bg='#14191F'
      color='#F5F5F5'
      // TODO: Add logic to apply bg image to home page only
      // backgroundImage={window.location.href === '/' ? "url(" + Background + ")" : ''}
      // backgroundPosition='center'
      // backgroundSize='cover'
      // backgroundRepeat='no-repeat'
    >
      {!isMobile && <Header/>}
      {window.location.pathname === '/' && isMobile && (
        <Box mb='3rem'>
          <SearchBar/>
        </Box>
      )}
      <main>
        <Outlet/>
      </main>
    </Container>
  )
}
