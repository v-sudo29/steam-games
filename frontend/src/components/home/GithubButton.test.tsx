import { render, screen } from "../../test/test-utils";
import GithubButton from "./GithubButton";
import user from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom'
import { vi } from 'vitest'

expect.extend(matchers)

describe('GithubButton component', () => {
  const mockFn = vi.fn()

  test('renders', () => {
    render(<GithubButton openGithubTab={mockFn}/>)
    const buttonElement = screen.getByRole('button', { name: /github/i })
    expect(buttonElement).toBeVisible()
  })

  test('should open github tab on user click', async () => {
    render(<GithubButton openGithubTab={mockFn}/>)
    const buttonElement = screen.getByRole('button', { name: /github/i })
    await user.click(buttonElement)

    expect(mockFn).toHaveBeenCalled()
  })
})