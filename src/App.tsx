import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Root from './components/Root.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import SellerLandingPage from './pages/SellerLandingPage.tsx';
import HomePage from './pages/HomePage.tsx';


const router = createBrowserRouter( createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />
    <Route path="/seller" element={<SellerLandingPage />} />
    <Route path='/home' element={<HomePage />} />
  </Route>
));

function App() {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;
