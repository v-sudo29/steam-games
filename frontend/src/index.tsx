import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { DefaultDataProvider } from './context/defaultDataContext';
import { FilterProvider } from './context/filterContext';
import { GenresProvider } from './context/genresContext';
import { PageProvider } from './context/pageContext';
import { SearchProvider } from './context/searchContext';
import { SortListProvider } from './context/sortListContext';
import { TabsProvider } from './context/tabsContext';
import App from './App';

const theme = extendTheme({
  components: {
    Checkbox: {
      baseStyle: {
        icon: {
          color: 'white',
        },
        control: {
          border: '1px',
          borderColor: '#4A525C',
          borderRadius: '0.15rem',
          marginRight: '0.5rem'
        },
        label: {
          fontWeight: '600'
        }
      },
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <DefaultDataProvider>
      <FilterProvider>
        <GenresProvider>
          <PageProvider>
            <SearchProvider>
              <SortListProvider>
                <TabsProvider>
                  <ChakraProvider theme={theme}>
                    <App />
                  </ChakraProvider>
                </TabsProvider>
              </SortListProvider>
            </SearchProvider>
          </PageProvider>
        </GenresProvider>
      </FilterProvider>
    </DefaultDataProvider>
  </React.StrictMode> 
);