import { render, screen } from "../../../../test/test-utils";
import { vi } from "vitest";
import user from '@testing-library/user-event'
import Option from "./Option";

describe('Option component', () => {
  const mockOption = 'Discount'
  const mockFn = vi.fn()

  test('renders', () => {
    render(<Option
      option={mockOption}
      handleSelection={mockFn}/>
    )
    const optionElement = screen.getByRole('option', { name: 'Discount' })
    expect(optionElement).toBeVisible()
  })

  test('handles selection on user click', async () => {
    user.setup()
    render(<Option
      option={mockOption}
      handleSelection={mockFn}/>
    )
    const optionElement = screen.getByRole('option', { name: 'Discount' })
    await user.click(optionElement)
    expect(mockFn).toHaveBeenCalled()
  })
})