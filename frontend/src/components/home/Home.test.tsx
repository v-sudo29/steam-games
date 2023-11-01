import { render, screen } from "../../test/test-utils";
import { expect } from 'vitest';
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
})

