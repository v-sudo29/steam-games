import { useMobile } from "../context/useMobileContext"

export default function CarrotDownIcon({ animate, setAnimate } : { animate: boolean, setAnimate: React.Dispatch<React.SetStateAction<boolean>> }) {
  const isMobile = useMobile()

  const carrotStyles = {
    marginLeft: !isMobile ? '0.6rem' : '0rem',
    transition: '200ms ease',
    transform: animate ? 'rotate(180deg)' : ''
  }

  return (
    <svg
      id='carrotIcon'
      onClick={(e) => {
        e.stopPropagation()
        setAnimate(prev => !prev)
      }}
      style={carrotStyles}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M18.5 9L12.7328 15.2108C12.3372 15.6369 11.6628 15.6369 11.2672 15.2108L5.5 9" stroke="#F5F5F5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
