import { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import ContentLayout from './layout/ContentLayout';
import Home from './components/home/Home';
import NotFound from './components/common/error/NotFound';
import WishlistContainer from './components/cards/WishlistContainer';
import AllGamesContainer from './components/cards/AllGamesContainer';
import ReactGA from 'react-ga4'
import TagManager from 'react-gtm-module'
import './App.css';

const App = () => {

  // Initialize Google Analytics 4 and Google Tag Manager on initial render
  useEffect(() => {
    ReactGA.initialize(`${import.meta.env.VITE_MEASUREMENT_ID}`)
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home Page" });
    ReactGA.send({ hitType: "pageview", page: "/all-games", title: "All Games" });
    ReactGA.send({ hitType: "pageview", page: "/wishlist", title: "Wishlist" });
    
    const tagManagerArgs = {
      gtmId: `${import.meta.env.VITE_GTM_ID}`,
    }
    TagManager.initialize(tagManagerArgs)
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route element={<ContentLayout/>}>
          <Route path='/wishlist' element={<WishlistContainer/>}/>
          <Route path='/all-games' element={<AllGamesContainer/>}/>
        </Route>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </>
    )
  )

  return (
    <RouterProvider router={router}/>
  );
}

export default App;