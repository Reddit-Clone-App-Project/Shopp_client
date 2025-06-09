import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Root from './components/Root.tsx';
import './App.css'

const router = createBrowserRouter( createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route index element={< />} />
    <Route path=" " element={< />} />
  </Route>
));

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
