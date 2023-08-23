import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import ContentLayout from './layout/ContentLayout';
import Home from './components/Home';
import WishlistCards from './components/cards/WishlistCards';
import AllGamesCards from './components/cards/AllGamesCards';
import './App.css';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route element={<ContentLayout/>}>
          <Route path='/wishlist' element={<WishlistCards/>}/>
          <Route path='/all-games' element={<AllGamesCards/>}/>
        </Route>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  );
}

export default App;