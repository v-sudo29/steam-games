import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import ContentLayout from './layout/ContentLayout';
import Home from './components/home/Home';
import NotFound from './components/common/error/NotFound';
import WishlistCards from './components/cards/WishlistCards';
import AllGamesCards from './components/cards/AllGamesCards';
import ReactGA from 'react-ga4'
import TagManager from 'react-gtm-module'
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Initialize Google Analytics 4
    ReactGA.initialize(`${import.meta.env.VITE_MEASUREMENT_ID}`)
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home Page" });
    ReactGA.send({ hitType: "pageview", page: "/all-games", title: "All Games" });
    ReactGA.send({ hitType: "pageview", page: "/wishlist", title: "Wishlist" });

    // Initialize Google Tag Manager
    const tagManagerArgs = {
      gtmId: `${import.meta.env.VITE_GTM_ID}`,
      dataLayerHome: {
        page: location.pathname,
        title: 'Home Page'
      }
    }
    TagManager.initialize(tagManagerArgs)
  }, [])

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
        <Route path='*' element={<NotFound/>}/>
      </>
    )
  )

  return (
    <RouterProvider router={router}/>
  );
}

export default App;