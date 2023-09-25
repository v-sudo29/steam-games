import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import ContentLayout from './layout/ContentLayout';
import Home from './components/Home';
import NotFound from './components/error/NotFound';
import WishlistCards from './components/cards/WishlistCards';
import AllGamesCards from './components/cards/AllGamesCards';
import ReactGA from 'react-ga4'
import './App.css';

function App() {
  ReactGA.initialize(`${import.meta.env.MEASUREMENT_ID}`)
  ReactGA.send({ hitType: "pageview", page: "/", title: "Custom Title" });

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