import { Tab } from '@chakra-ui/react'
import { GameObject } from '../../../../interface/GameObject'

interface MyWishlistTabProps {
  handleTabsChange: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  wishlistTabActive: boolean
  wishlistData: GameObject[] | null
}

export const MyWishlistTab = ({
  handleTabsChange,
  wishlistTabActive,
  wishlistData
} : MyWishlistTabProps) => {
  return (
    <Tab
      onClick={handleTabsChange}
      border='none'
      _selected={{ color: '#F5F5F5' }}
      _hover={!wishlistTabActive ? { color: 'whiteAlpha.700' } : { color: '#F5F5F5' }}
      color={!wishlistTabActive ? '#5C5F63' : '#F5F5F5'}
      fontWeight='700'
      fontSize='1.3rem'
    >
      My Wishlist {wishlistData && `(${wishlistData.length})`}
    </Tab>
  )
}