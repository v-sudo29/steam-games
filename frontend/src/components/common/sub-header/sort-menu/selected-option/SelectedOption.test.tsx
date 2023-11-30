import { render, screen } from "../../../../../test/test-utils";
import SelectedOption from "./SelectedOption";
import user from '@testing-library/user-event'

describe('SelectedOption component', () => {
  const mockBoolean = true
  const mockFn = vi.fn()
  const mockFnTwo = vi.fn()
  const mockSelected = 'Discount'

  test('renders', () => {
    render(
      <SelectedOption
        open={mockBoolean}
        openSelectMenu={mockFn}
        setOpen={mockFnTwo}
        selected={mockSelected}
      />
    )
    const selectedElement = screen.getByRole('button', { name: 'Discount' })
    expect(selectedElement).toBeVisible()
  })

  test('opens select menu on click', async () => {
    user.setup()
    render(
      <SelectedOption
        open={mockBoolean}
        openSelectMenu={mockFn}
        setOpen={mockFnTwo}
        selected={mockSelected}
      />
    )
    const selectedElement = screen.getByRole('button', { name: 'Discount' })
    await user.click(selectedElement)
    expect(mockFn).toHaveBeenCalled()
  })
})