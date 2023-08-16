import { ChakraProvider, extendTheme, } from '@chakra-ui/react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { SearchProvider } from './context/searchContext';
import { TabsProvider } from './context/tabsContext';
import Layout from './layout/Layout';
import ContentLayout from './layout/ContentLayout';
import Home from './components/Home';
import WishlistCards from './components/WishlistCards';
import AllGamesCards from './components/AllGamesCards';
import './App.css';

function App() {
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
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route element={<ContentLayout/>}>
            <Route path='/wishlist' element={<WishlistCards/>}/>
            <Route path='/all-games' element={<AllGamesCards/>}/>
          </Route>
        </Route>
      </>
    )
  )

  return (
    <SearchProvider>
      <TabsProvider>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router}/>
        </ChakraProvider>
      </TabsProvider>
    </SearchProvider>
  );
}

export default App;