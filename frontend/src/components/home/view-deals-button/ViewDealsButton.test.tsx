import { render, screen } from "../../../test/test-utils";
import ViewDealsButton from "./ViewDealsButton";
import user from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom'

expect.extend(matchers)

describe('ViewDealsButton component', () => {
  const mockFn = vi.fn()

  test('renders', () => {
    render(<ViewDealsButton navigateToDeals={mockFn}/>)
    const buttonElement = screen.getByRole('button', { name: /view deals/i})
    expect(buttonElement).toBeVisible()
  })

  test('should navigate to deals page on click', async () => {
    user.setup()
    render(<ViewDealsButton navigateToDeals={mockFn}/>)
    const buttonElement = screen.getByRole('button', { name: /view deals/i})

    await user.click(buttonElement)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test('button hover color is visible on hover', async () => {
    user.setup()
    render(<ViewDealsButton navigateToDeals={mockFn}/>)
    const viewDealsButtonElement = screen.getByRole('button', { name: /view deals/i })
    
    await user.hover(viewDealsButtonElement)
    const styles = getComputedStyle(viewDealsButtonElement)
    expect(styles.backgroundColor).toBe('rgb(99, 39, 195)')
  })
})