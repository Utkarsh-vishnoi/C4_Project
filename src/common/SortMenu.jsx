import { FormControl, MenuItem, Select, Typography } from "@mui/material";

const SortMenu = ({ setSort }) => {
  return (
    <div style={{ marginLeft: "6%", marginTop: 10 }}>
      <Typography display="block">Sort By:</Typography>
      <FormControl style={{ width: "20%" }} size="small">
        <Select
          labelId="sort-by-label"
          inputProps={{ id: "sort-by" }}
          onChange={(e) => setSort(e.target.value)}
          defaultValue={"default"}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="desc">Price: High to Low</MenuItem>
          <MenuItem value="asc">Price: Low to High</MenuItem>
          <MenuItem value="new">Newest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortMenu;
