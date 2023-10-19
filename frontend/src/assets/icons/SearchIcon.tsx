import { useMobile } from "../../context/useMobileContext"

export default function SearchIcon() {
  const isMobile = useMobile()
  const iconStyles = {
    width: isMobile ? '30' : '15',
    height: isMobile ? '30' : '15',
  }

  const homeIconStyles = {
    width: '15',
    height: '15'
  }

  return (
    <svg style={window.location.pathname === '/' ? homeIconStyles :iconStyles} className='SearchIcon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke={!isMobile ? '#7D8793' : '#BCC6D2'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21.0004 21.0004L16.6504 16.6504" stroke={!isMobile ? '#7D8793' : '#BCC6D2'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
