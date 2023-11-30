import { Button } from "@chakra-ui/react"
import CarrotDownIcon from "../../../../../assets/icons/CarrotDownIcon"

interface SelectedOptionProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  openSelectMenu: () => void
  open: boolean
  selected: string
}

const SelectedOption = ({
  open,
  openSelectMenu,
  setOpen,
  selected
} : SelectedOptionProps) => {
  return (
    <Button
      tabIndex={0}
      id='selectedCard'
      pos='relative'
      w='inherit'
      onClick={openSelectMenu}
      cursor='pointer'
      rightIcon={
        <CarrotDownIcon
          animate={open}
          setAnimate={setOpen}
        />
      }
      fontWeight='600'
      border='none'
      borderRadius='0.4rem'
      color='#F5F5F5'
      bg='#2F3740'
      _hover={{ backgroundColor: '#3b454f' }}
    >
      {selected}
    </Button>
  )
}

export default SelectedOption