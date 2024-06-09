import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Page1 from './pages/Page1.jsx';
import FourZeroFour from './pages/FourZeroFour.jsx';

import './index.css';
// eslint-disable-next-line no-unused-vars
import { Collapse, ScrollSpy, Carousel } from 'bootstrap';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/page1', element: <Page1 /> },
      { path: '*', element: <FourZeroFour /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
