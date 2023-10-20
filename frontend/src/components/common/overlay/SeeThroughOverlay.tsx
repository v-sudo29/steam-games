import { useFilter } from '../../../context/filterContext'
import { Box } from '@chakra-ui/react'

const SeeThroughOverlay = () => {
  const { setExpanded } = useFilter()
  
  return (
    <Box
      pos='fixed'
      h='500vh'
      w='200vw'
      opacity='0.9'
      top='0'
      zIndex={10}
      backgroundColor='#14191F'
      onClick={() => setExpanded(false)}
    >
    </Box>
  )
}

export default SeeThroughOverlay