import React from "react";
import { OutlinedInput, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
const Searchbar = ({ searchQuery, setSearchQuery }) => {
  const customOutlinedInputStyle = {
    position: "absolute",
    transform: "translate(0%, -50%)",
    color: "#FFFFFF",
    borderRadius: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
    width: "100%",
    height: "40px",
  };

  const centerContainerStyle = {
    textAlign: "center",
    width: "33%",
    position: "relative",
  };

  return (
    <div style={centerContainerStyle}>
      <OutlinedInput
        id="search"
        style={customOutlinedInputStyle}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Search style={{ color: "#FFFFFF" }} />
          </InputAdornment>
        }
        placeholder={"Search"}
        inputProps={{
          "aria-label": "search",
        }}
      />
    </div>
  );
};

export default Searchbar;
