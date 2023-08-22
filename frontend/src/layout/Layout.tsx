import Header from "../components/Header"
import { Container } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { useMobile } from "../context/useMobileContext"

export default function Layout() {
  const isMobile = useMobile()
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
    >
      {!isMobile && <Header/>}
      <main>
        <Outlet/>
      </main>
    </Container>
  )
}
