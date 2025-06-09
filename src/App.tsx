import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Root from './components/Root.tsx';
import './App.css'
import LoginPage from './pages/LoginPage.tsx';

const router = createBrowserRouter( createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route path="/login" element={<LoginPage />} />
  </Route>
));

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
