import { render, screen } from "@testing-library/react";
import { expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom'
import Home from "./Home";

expect.extend(matchers)

describe('Home', () => {
  test('renders correctly', () => {
    render(<BrowserRouter><Home/></BrowserRouter>)
    const textElement = screen.getByRole('heading', { name: /on sale/i })
    const ghButtonElement = screen.getByRole('button', { name: /github/i })
    const viewDealsButtonElement = screen.getByRole('button', { name: /view deals/i })

    expect(textElement).toBeVisible()
    expect(ghButtonElement).toBeVisible()
    expect(viewDealsButtonElement).toBeVisible()
  })
})

