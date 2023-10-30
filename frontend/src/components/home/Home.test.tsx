import { render, screen } from "@testing-library/react";
import { expect, vi } from 'vitest';
import user from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom'
import Home from "./Home";
import { ReactNode } from "react";

expect.extend(matchers)

const routerWrapper = ({ children } : { children: ReactNode }) => 
  <BrowserRouter>{ children }</BrowserRouter>

describe('Home', () => {
  test('renders correctly', () => {
    render(<Home/>, { wrapper: routerWrapper })
    const textElement = screen.getByRole('heading', { name: /on sale/i })
    const ghButtonElement = screen.getByRole('button', { name: /github/i })
    const viewDealsButtonElement = screen.getByRole('button', { name: /view deals/i })

    expect(textElement).toBeVisible()
    expect(ghButtonElement).toBeVisible()
    expect(viewDealsButtonElement).toBeVisible()
  })

  test('View Deals button hover color is visible on hover', async () => {
    user.setup()
    render(<Home/>, { wrapper: routerWrapper })
    const viewDealsButtonElement = screen.getByRole('button', { name: /view deals/i })
    
    await user.hover(viewDealsButtonElement)
    const styles = getComputedStyle(viewDealsButtonElement)
    expect(styles.backgroundColor).toBe('rgb(99, 39, 195)')
  })

  test('click handlers are called', () => {
    const handleClick = vi.fn()
  })
})

