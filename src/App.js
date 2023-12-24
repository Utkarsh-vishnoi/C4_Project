import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import Root from './common/Root.jsx';

import Login from './components/Login/Login.jsx';
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
  const [token, setToken] = useState()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root token={token} />,
    },
    {
      path: "/login",
      element: <Login setToken={setToken} />,
    },
  ])

  if (!token) {
    router.navigate('/login')
  }

  return (
    <>
      <ThemeProvider theme={theme} >
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App;
