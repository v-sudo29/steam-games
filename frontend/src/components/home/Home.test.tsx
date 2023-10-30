import { render, screen } from "../../test/test-utils";
import { expect } from 'vitest';
import user from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom'
import Home from "./Home";

expect.extend(matchers)

describe('Home', () => {
  test('renders correctly', () => {
    render(<Home/>)
    const textElement = screen.getByRole('heading', { name: /on sale/i })
    const ghButtonElement = screen.getByRole('button', { name: /github/i })
    const viewDealsButtonElement = screen.getByRole('button', { name: /view deals/i })

    expect(textElement).toBeVisible()
    expect(ghButtonElement).toBeVisible()
    expect(viewDealsButtonElement).toBeVisible()
  })

  test('View Deals button hover color is visible on hover', async () => {
    user.setup()
    render(<Home/>)
    const viewDealsButtonElement = screen.getByRole('button', { name: /view deals/i })
    
    await user.hover(viewDealsButtonElement)
    const styles = getComputedStyle(viewDealsButtonElement)
    expect(styles.backgroundColor).toBe('rgb(99, 39, 195)')
  })
})

