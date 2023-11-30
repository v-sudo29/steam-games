import { Box } from "@chakra-ui/react"

interface OptionProps {
  option: string
  handleSelection: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Option = ({ option, handleSelection } : OptionProps) => {
  return (
    <Box
      key={option}
      tabIndex={0}
      className='optionCard'
      onClick={handleSelection}
      fontWeight='400'
      _hover={{ 
        background: '#3b454f',
        fontWeight: '600'
      }}
      cursor='pointer'
      w='inherit'
      p='0.4rem 1.4rem'
      textAlign='left'
      border='none'
      _focusVisible={{
        outline: '4px solid #3D668F'
      }}
      role='option'
    > 
      {option}
    </Box>
  )
}

export default Option