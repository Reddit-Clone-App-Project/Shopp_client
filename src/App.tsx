import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Root from './components/Root.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import SellerLandingPage from './pages/SellerLandingPage.tsx';
import HomePage from './pages/HomePage.tsx';
import PrivateRoute from './components/PrivateRoutes.tsx';
import CreateStorePage from './pages/CreateStorePage.tsx';


const router = createBrowserRouter( createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />
    <Route path="/seller" element={<SellerLandingPage />} />
    <Route path='/home' element={<HomePage />} />
    <Route path='/new-store' element={<PrivateRoute component={CreateStorePage} />} />
  </Route>
));

function App() {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;
