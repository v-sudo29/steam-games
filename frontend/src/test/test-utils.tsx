import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SearchProvider } from '../context/searchContext'
import { GenresProvider } from '../context/genresContext'
import { SortProvider } from '../context/sortContext'
import { TabsProvider } from '../context/tabsContext'
import { DefaultDataProvider } from '../context/defaultDataContext'

const AllTheProviders = ({ children } : { children: React.ReactNode }) => {
  return (
    <MemoryRouter>
      <DefaultDataProvider>
        <TabsProvider>
          <SearchProvider>
            <GenresProvider>
              <SortProvider>
                {children}
              </SortProvider>
            </GenresProvider>
          </SearchProvider>
        </TabsProvider>
      </DefaultDataProvider>
    </MemoryRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }