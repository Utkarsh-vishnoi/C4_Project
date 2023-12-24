import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import Root from './common/Root.jsx';

// import Navbar from './components/Navbar/Navbar.jsx';
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3e51b5",
    },
    secondary: {
      main: "#f50057",
    }
  }
});

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
  ])


  return (
    <>
      <ThemeProvider theme={theme} >
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App;
