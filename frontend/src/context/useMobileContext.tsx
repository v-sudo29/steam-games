import { createContext, useContext, useState, useEffect, ReactNode } from "react"

const MobileContext = createContext<boolean>(false)

export const useMobile = () => {
  return useContext(MobileContext)
}

export const MobileProvider = ({ children } : { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const handleResize = (): void => {
    if (window.innerWidth > 790) setIsMobile(false)
    else setIsMobile(true)
  }

  // Handle window resizing for media queries
  useEffect(() => {
    if (window.innerWidth > 790) setIsMobile(false)
    else setIsMobile(true)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <MobileContext.Provider value={isMobile}>
      {children}
    </MobileContext.Provider>
  )
}