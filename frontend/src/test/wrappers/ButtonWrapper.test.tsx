import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event'
import { vi } from "vitest";
import ButtonWrapper from "./ButtonWrapper";

describe('ButtonWrapper', () => {
  const mockOnClick = vi.fn()

  test('renders', () => {
    render(<ButtonWrapper onClick={mockOnClick} title='Sample Title'/>)
    const textElement = screen.getByText('Sample Title')
    expect(textElement).toHaveTextContent('Sample Title')
  })

  test('handles onClick', async () => {
    render(<ButtonWrapper onClick={mockOnClick} title='Sample Title'/>)
    const textElement = screen.getByText('Sample Title')
    await user.click(textElement)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})