import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { SearchProvider } from '../context/searchContext'

const AllTheProviders = ({ children }: {children: React.ReactNode}) => {
  return (
    <BrowserRouter>
      <SearchProvider>
        {children}
      </SearchProvider>
    </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }