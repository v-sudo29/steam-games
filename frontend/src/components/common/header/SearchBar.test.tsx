import { render, screen } from "../../../test/test-utils";
import SearchBar from "./SearchBar";
import matchers from '@testing-library/jest-dom'
import user from '@testing-library/user-event'

expect.extend(matchers)

describe('SearchBar component', () => {
  test('renders', () => {
    render(<SearchBar />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeVisible()
  })

  test('correctly focuses on click', async () => {
    user.setup()
    render(<SearchBar />)
    const inputElement = screen.getByRole('textbox')

    await user.click(inputElement)
    expect(inputElement).toHaveFocus()
  })

  test('correctly updates input value when user types search query', async () => {
    user.setup()
    render(<SearchBar />)
    const inputElement = screen.getByRole('textbox')

    await user.click(inputElement)
    await user.type(inputElement, 'portal')

    expect(inputElement).toHaveValue('portal')
  })
})