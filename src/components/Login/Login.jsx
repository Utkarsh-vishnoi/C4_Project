import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "../Navbar/Navbar";
import Copyright from "../../common/Copyright";

const Login = ({ userInfo, setUserInfo }) => {
  // State variables for username and password
  const [username, setUserame] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  // Check if user is already logged in and redirect to the home page
  useEffect(() => {
    if (userInfo.token) {
      navigate("/");
    }
  }, [userInfo.token, navigate]);

  // Function to handle form submission with credentials
  const submitHandler = async (e) => {
    e.preventDefault();
    fetch(`/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Incorrect E-mail or Password.");
          } else {
            throw new Error(
              "There was a problem with the Fetch operation: " + res.status,
            );
          }
        }
        const data = await res.json();
        return { ...data, token: res.headers.get("x-auth-token") };
      })
      .then((data) => {
        // Set user information and navigate to the home page on successful login
        setUserInfo(data);
        navigate("/", { state: { message: "Login successful" } });
      })
      .catch((err) => {
        toast.error(err.toString(), { toastId: "login-alert" });
      });
  };
  // Render the Login component
  return (
    <>
      <Navbar userInfo={userInfo} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            id="login-form"
            onSubmit={submitHandler}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUserame(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
            >
              SIGN IN
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
};

export default Login;
