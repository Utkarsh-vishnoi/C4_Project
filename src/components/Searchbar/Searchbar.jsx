import { Search } from "@mui/icons-material";
import { alpha, OutlinedInput, InputAdornment } from "@mui/material";
import React, { useState } from "react";

const Searchbar = () => {
  const [query, setQuery] = useState('');
  return (
    <div style={{width: "33%", textAlign: "center", margin: "0 auto"}}>
    <OutlinedInput
    id="search"
    sx={{
      flexGrow: 1,
      color: "#FFFFFF",
      borderRadius: 1,
      backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
      },
      width: "100%",
      marginLeft: 20,
    }}
    value={query}
    onChange={(e) => {setQuery(e.target.value)}}
    startAdornment={
      <InputAdornment position="start">
        <Search sx={{color: "#FFFFFF"}}/>
      </InputAdornment>
    }
    placeholder={"Search"}
    inputProps={{
      'aria-label': 'search',
    }}
  />
  </div>
  );
};

export default Searchbar;
