import { render, screen } from '../../../../test/test-utils'
import TwoTabs from './TwoTabs'

describe('TwoTabs component', () => {
  test('renders both tabs', () => {
    render(<TwoTabs/>)
    const tabs = screen.getAllByRole('tab')
    const allGamesTab = screen.getByRole('tab', { name: 'All Games' })
    const myWishlistTab = screen.getByRole('tab', { name: 'My Wishlist' })

    expect(tabs.length).toBeGreaterThan(0)
    expect(tabs).toHaveLength(2)
    expect(allGamesTab).toBeVisible()
    expect(myWishlistTab).toBeVisible()
  })
})