import { render, screen } from "../../../test/test-utils";
import Header from "./Header";
import matchers from '@testing-library/jest-dom'

expect.extend(matchers)

describe('Header component', () => {
  test('renders', () => {
    render(<Header/>)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeVisible()
  })
})