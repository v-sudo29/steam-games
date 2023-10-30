import { render, screen } from '../../../test/test-utils'
import SortMenu from './SortMenu'

describe('SortMenu component', () => {
  test('renders', () => {
    render(<SortMenu/>)
    const divElement = screen.getByRole('sortmenu')
    expect(divElement).toBeInTheDocument()
  })
})