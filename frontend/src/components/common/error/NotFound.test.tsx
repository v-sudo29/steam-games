import { render, screen } from '../../../test/test-utils'
import NotFound from './NotFound'

describe('NotFound component', () => {
  test('renders', () => {
    render(<NotFound/>)
    const textElement = screen.getByText('Error: 404 Page Not Found')
    expect(textElement).toBeVisible()
  })
})