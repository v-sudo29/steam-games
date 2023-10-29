import { render, screen, renderHook } from "@testing-library/react";
import SearchBar from "./SearchBar";
import matchers from '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";
import user from '@testing-library/user-event'
import { SearchProvider } from "../../../context/searchContext";

expect.extend(matchers)

const routerAndSearchWrapper = ({ children } : { children: ReactNode }) => 
  <BrowserRouter>
    <SearchProvider>
      { children }
    </SearchProvider>
  </BrowserRouter>

describe('SearchBar component', () => {
  test('renders', () => {
    render(<SearchBar />, { wrapper: routerAndSearchWrapper })
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeVisible()
  })

  test('correctly focuses on click', async () => {
    user.setup()
    render(<SearchBar />, { wrapper: routerAndSearchWrapper })
    const inputElement = screen.getByRole('textbox')

    await user.click(inputElement)
    expect(inputElement).toHaveFocus()
  })

  test('correctly updates input value when user types search query', async () => {
    user.setup()
    render(<SearchBar />, { wrapper: routerAndSearchWrapper })
    const inputElement = screen.getByRole('textbox')

    await user.click(inputElement)
    await user.type(inputElement, 'portal')

    expect(inputElement).toHaveValue('portal')
  })
})