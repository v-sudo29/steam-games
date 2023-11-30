import { render, screen } from "../../../../test/test-utils";
import PageNumber from "./PageNumber";
import user from '@testing-library/user-event'

describe('PageNumber component', () => {
  const mockFn = vi.fn()
  const mockIndex = 2
  const mockPageNumber = 2

  test('renders', () => {
    render(
      <PageNumber
        i={mockIndex}
        pageNumber={mockPageNumber}
        handleClick={mockFn}
      />
    )
    const textElement = screen.getByText('2')
    expect(textElement).toBeVisible()
  })

  test('handles page change on click', async () => {
    user.setup()
    render(
      <PageNumber
        i={mockIndex}
        pageNumber={mockPageNumber}
        handleClick={mockFn}
      />
    )
    const textElement = screen.getByText('2')
    await user.click(textElement)
    expect(mockFn).toHaveBeenCalled()
  })
})