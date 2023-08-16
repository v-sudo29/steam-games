import { Icon } from "@chakra-ui/react"

export default function CheckboxIcon(props: any) {
  const { isChecked, ...rest } = props

  return (
    <>
      <Icon
        w='0.55rem'
        transform={isChecked ? 'scale(1)' :'scale(0)'}
        transition= '200ms transform ease-in-out'
        viewBox="0 0 12 12" 
        {...rest}
      >
        <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="12" height="12" rx="2" fill="white"/>
        </svg>    
      </Icon>
    </>
  )
}
