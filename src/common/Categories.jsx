import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Categories = ({ category, setCategory, refreshCategory }) => {
  const [categories, setCategories] = useState([]);

  const categoryChangeHandler = (e, newCategory) => {
    if (newCategory !== null) {
      setCategory(newCategory);
    }
  };

  //Fetch the list of all categories
  useEffect(() => {
    fetch(`/api/products/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(
            "There was a problem with the Fetch operation: " + res.status,
          );
        return res.json();
      })
      .then((data) => {
        if (!data.includes(category)) {
          setCategory("all");
        }
        setCategories(data);
      })
      .catch((err) => {
        toast.error(err.toString(), { toastId: "categories-alert" });
      });
  }, [refreshCategory, category, setCategory]);

  return (
    <ToggleButtonGroup
      color="primary"
      value={category}
      exclusive
      onChange={categoryChangeHandler}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ToggleButton value="all">ALL</ToggleButton>
      {categories.map((item, index) => (
        <ToggleButton key={index} value={item}>
          {item.toUpperCase()}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default Categories;
