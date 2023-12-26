import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';
import Root from './common/Root.jsx';

import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
// import Navbar from './components/Navbar/Navbar.jsx';
import { ThemeProvider, createTheme } from "@mui/material";
import Home from './components/Home/Home.jsx';

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
      element: <Root token={token} setToken={setToken} />,
      children: [
        {
          path: "/",
          element: <Home />
        }
      ]
    },
    {
      path: "/login",
      element: <Login setToken={setToken} />,
    },
    {
      path: "/signup",
      element: <Signup />
    }
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
