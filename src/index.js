import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Home from './Routes/Home/Home';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Home/>,
      errorElement: <h1>Error</h1>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <RouterProvider router={router}/>
  
);

