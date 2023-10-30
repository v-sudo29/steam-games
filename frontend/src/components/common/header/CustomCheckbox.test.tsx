import { render, screen } from '../../../test/test-utils'
import CustomCheckbox from './CustomCheckbox'

describe('CustomCheckbox', () => {
  test('renders and passes in correct props', () => {
    render(<CustomCheckbox genre={'testGenre'} />)
    const checkboxElement = screen.getByRole('checkbox', { name: 'testGenre' })
    expect(checkboxElement).toBeVisible()
  })
})