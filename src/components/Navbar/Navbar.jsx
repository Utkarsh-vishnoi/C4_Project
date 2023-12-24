import React from "react";
import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import "./Navbar.css";
import { Link } from "react-router-dom";
import SearchComponent from "../../common/Searchbar";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <ShoppingCart sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            upGrad E-Shop
          </Typography>
          <SearchComponent />
          <div>
            <Link className="headerLinks" to="/login" color="inherit">
              Login
            </Link>
            <Link className="headerLinks" to="/signup" color="inherit">
              Sign Up
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
