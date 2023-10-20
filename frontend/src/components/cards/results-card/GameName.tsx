interface GameNameProps {
  name: string
  isSafari: boolean
  isMobile: boolean
}

const GameName = ({ name, isSafari, isMobile } : GameNameProps) => {
  return (
    <figcaption className='gameTitle game-card-component' 
      style={{
        marginBottom: isSafari ? '0.9rem' : '0',
        fontSize: !isMobile ? '0.9rem' : '1rem',
        fontWeight: '600',
        height: '3rem'
      }}
    >
      {name}
    </figcaption>
  )
}

export default GameName