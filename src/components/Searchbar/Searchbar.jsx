import { Search } from "@mui/icons-material";
import { InputBase, alpha, styled } from "@mui/material";

const Searchbar = () => {

  const searchHandler = (e) => {
    console.log(e.target.value)
  }

  const SearchWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(20),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "30ch",
      },
    },
  }));

  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <Search />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        type="search"
        onChange={searchHandler}
        inputProps={{ "aria-label": "search" }}
      />
    </SearchWrapper>
  );
};

export default Searchbar;
