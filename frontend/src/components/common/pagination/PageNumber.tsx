import { Text } from "@chakra-ui/react"

interface PageNumberArgs {
  i: number,
  pageNumber: number,
  handleClick: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void
}

const PageNumber = ({ i, pageNumber, handleClick } : PageNumberArgs) => {
  return (
    <Text 
      onClick={(e) => handleClick(e)}
      className={i === pageNumber ? 'active-page' : ''}
      cursor={i !== pageNumber ? 'pointer' : 'default'} 
      fontSize='1.2rem'
    >{i}
    </Text>
  )
}

export default PageNumber