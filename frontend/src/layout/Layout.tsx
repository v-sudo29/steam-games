import Header from "../components/Header"
import { Container } from "@chakra-ui/react"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    console.log(location.pathname === '/all-games')
  })

  return (
    <Container
      display='flex'
      minH='100vh'
      minW='0vw'
      maxW='90vw'
      w='300rem'
      flexDir='column'
      gap='1rem'
      padding='2rem 2rem'
      bg='#14191F'
      color='#F5F5F5'
    >
      <Header/>
      <main>
        <Outlet/>
      </main>
    </Container>
  )
}
