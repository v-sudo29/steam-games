import { render, screen, act } from '../../../../test/test-utils'
import user from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom'
import SortMenu from './SortMenu'

expect.extend(matchers)

describe('SortMenu component', () => {
  test('renders default \'Discount\' option', async () => {
    render(<SortMenu/>)
    const discountOption = await screen.findByRole('button', { name: 'Discount' })
    expect(discountOption).toBeVisible()
  })

  test('click sort menu and see other options', async () => {
    user.setup()
    render(<SortMenu/>)
    const buttonElement = screen.getByRole('button')
    await act(async () => await user.click(buttonElement))

    const ratingOption = await screen.findByText('Rating')
    const feedbackOption = await screen.findByText('Feedback')
    const priceOption = await screen.findByText('Price')

    expect(ratingOption).toBeVisible()
    expect(feedbackOption).toBeVisible()
    expect(priceOption).toBeVisible()
  })
})