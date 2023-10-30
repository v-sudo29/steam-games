import { render, screen } from "../../../test/test-utils";
import FilterButton from "./FilterButton";
import matchers from '@testing-library/jest-dom'
import user from '@testing-library/user-event'

expect.extend(matchers)

describe('FilterButton component', () => {
  test('renders', () => {
    render(<FilterButton/>)
    const buttonElement = screen.getByRole('button', { name: 'Filter' })
    expect(buttonElement).toBeVisible()
  })

  test('on hover, background color changes to correct color', async () => {
    user.setup()
    render(<FilterButton/>)
    const buttonElement = screen.getByRole('button', { name: 'Filter'})

    await user.hover(buttonElement)
    const styles = getComputedStyle(buttonElement)
    expect(styles.backgroundColor).toBe('rgb(59, 69, 79)')
  })

})