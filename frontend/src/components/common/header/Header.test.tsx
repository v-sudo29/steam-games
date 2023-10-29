import { render, screen } from "@testing-library/react";
import Header from "./Header";
import matchers from '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";

expect.extend(matchers)

const routerWrapper = ({ children } : { children: ReactNode }) => 
  <BrowserRouter>{ children }</BrowserRouter>

describe('Header component', () => {
  test('renders', () => {
    render(<Header/>, { wrapper: routerWrapper })
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeVisible()
  })
})