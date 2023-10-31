import { render, screen, act } from '../../../test/test-utils'
import { vi } from 'vitest'
import CustomCheckbox from './CustomCheckbox'
import matchers from '@testing-library/jest-dom'
import user from '@testing-library/user-event'

expect.extend(matchers)

describe('CustomCheckbox component', () => {
  const mockFn = vi.fn()

  test('renders and passes in correct props', () => {
    render(
      <CustomCheckbox
        genre={'testGenre'}
        handleGenreClick={mockFn}
      />
    )
    const checkboxElement = screen.getByRole('checkbox', { name: 'testGenre' })
    expect(checkboxElement).toBeVisible()
  })

  test('handles user click to update selected genres', async () => {
    user.setup()
    render(
      <CustomCheckbox
        genre={'testGenre'}
        handleGenreClick={mockFn}
      />
    )
    const checkboxElement = screen.getByRole('checkbox', { name: 'testGenre' })
    await act(async () => await user.click(checkboxElement))

    expect(mockFn).toHaveBeenCalled()
  })
})