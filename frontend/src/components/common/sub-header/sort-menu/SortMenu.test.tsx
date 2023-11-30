import { render, screen, act } from '../../../../test/test-utils'
import { SortProvider } from '../../../../context/sortContext'
import { GenresProvider } from '../../../../context/genresContext'
import { SearchProvider } from '../../../../context/searchContext'
import user from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom'
import SortMenu from './SortMenu'

expect.extend(matchers)

// vi.mock('./selected-option/SelectedOption', () => ({
//   default: ({ selected } : { selected: string }) => {
//     return <button>{selected}</button>
//   }
// }))

describe('SortMenu component', () => {
  test('renders default \'Discount\' option', async () => {
    render(
      <GenresProvider>
        <SearchProvider>
          <SortProvider>
            <SortMenu/>
          </SortProvider>
        </SearchProvider>
      </GenresProvider>
    )
    const discountOption = await screen.findByRole('button', { name: 'Discount' })
    expect(discountOption).toBeVisible()
  })

  test('click sort menu and see other options', async () => {
    user.setup()
    render(
      <GenresProvider>
        <SearchProvider>
          <SortProvider>
            <SortMenu/>
          </SortProvider>
        </SearchProvider>
      </GenresProvider>
    )

    const buttonElement = screen.getByRole('button')
    await act(async () => await user.click(buttonElement))

    const ratingOption = await screen.findByText('Rating')
    const feedbackOption = await screen.findByText('Feedback')
    const priceOption = await screen.findByText('Price')

    expect(ratingOption).toBeVisible()
    expect(feedbackOption).toBeVisible()
    expect(priceOption).toBeVisible()
  })

  test('click sort menu and click on a new option', async () => {
    user.setup()
    render(
      <GenresProvider>
        <SearchProvider>
          <SortProvider>
            <SortMenu/>
          </SortProvider>
        </SearchProvider>
      </GenresProvider>
    )
    screen.debug()
    // const buttonElement = screen.getByRole('button')
    // await act(async () => await user.click(buttonElement))

    // const priceOption = await screen.findByText('Price')
    // await act(async () => await user.click(priceOption))

    // const newButtonElement = await screen.findByRole('button')
    // expect(newButtonElement).toBeVisible()

  })
})