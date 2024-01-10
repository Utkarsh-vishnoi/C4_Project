import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";

const ModifyProduct = () => {
  const { productId } = useParams();
  const { userInfo } = useOutletContext();

  const [name, setName] = useState("");
  const [category, setCategory] = useState({ label: "", value: "" });
  const [manufacturer, setManufacturer] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [availableItems, setAvailableItems] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  const title = productId === undefined ? "Add Product" : "Modify Product";

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
        setCategories(
          data.map((category) => ({
            value: category,
            label: category.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
          })),
        );
      })
      .catch((err) => {
        toast.error(err.toString(), { toastId: "categories-alert" });
      });

    if (productId !== undefined) {
      fetch(`/api/products/${productId}`, {
        method: "GET",
        headers: {
          "x-auth-token": userInfo.token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 401) {
              throw new Error("401 Unauthorized!");
            } else {
              throw new Error(
                "There was a problem with the Fetch operation: " + res.status,
              );
            }
          }
          return res.json();
        })
        .then((data) => {
          setName(data.name);
          setCategory({
            value: data.category,
            label: data.category.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
          });
          setManufacturer(data.manufacturer);
          setAvailableItems(data.availableItems);
          setPrice(data.price);
          setImageUrl(data.imageUrl);
          setDescription(data.description);
        })
        .catch((err) => {
          toast.error(err.toString(), { toastId: "modify-alert" });
        });
    }
  }, [productId, userInfo.token]);

  useEffect(() => {
    if (error !== "") toast.error(error, { toastId: "modify-product" });
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      category === "" ||
      manufacturer === "" ||
      price === "" ||
      imageUrl === "" ||
      description === "" ||
      availableItems === ""
    ) {
      setError("All fields must not be empty");
      return false;
    }
    let request;
    if (productId !== undefined) {
      // Modify exisiting product
      request = fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userInfo.token,
        },
        body: JSON.stringify({
          name,
          category: category.value,
          price,
          description,
          manufacturer,
          availableItems,
          imageUrl,
        }),
      });
    } else {
      request = fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userInfo.token,
        },
        body: JSON.stringify({
          name,
          category: category.value,
          price,
          description,
          manufacturer,
          availableItems,
          imageUrl,
        }),
      });
    }
    request
      .then((res) => {
        if (!res.ok)
          throw new Error(
            "There was a problem with the Fetch operation: " + res.status,
          );
        return res.json();
      })
      .then((data) => {
        toast.success(
          productId !== undefined
            ? `Product ${data.name} updated successfully.`
            : `Product ${data.name} added successfully`,
          {
            toastId: "add-product",
          },
        );
      })
      .catch((err) => {
        toast.error(err.toString(), { toastId: "categories-alert" });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {title}
        </Typography>

        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{ mt: 1 }}
          style={{
            textAlign: "left",
          }}
        >
          <TextField
            value={name}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />

          <CreatableSelect
            style={{
              textAlign: "left",
            }}
            name="category"
            placeholder="Category *"
            value={
              productId
                ? categories.filter((opt) => opt.value.includes(category.value))
                : category
            }
            options={categories}
            clearable={false}
            onChange={(e) => setCategory(e)}
            styles={{
              menu: (base) => ({
                ...base,
                zIndex: 100,
              }),
            }}
            color="primary"
          />
          <TextField
            value={manufacturer}
            margin="normal"
            required
            fullWidth
            name="manufacturer"
            label="Manufacturer"
            type="manufacturer"
            id="manufacturer"
            autoComplete="manufacturer"
            onChange={(e) => setManufacturer(e.target.value)}
          />
          <TextField
            value={availableItems}
            margin="normal"
            required
            fullWidth
            name="availableItems"
            label="Available Items"
            type="number"
            id="availableItems"
            onChange={(e) => setAvailableItems(e.target.value)}
          />
          <TextField
            value={price}
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            type="number"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            value={imageUrl}
            margin="normal"
            required
            fullWidth
            name="imageUrl"
            label="Image URL"
            type="url"
            id="imageUrl"
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <TextField
            value={description}
            margin="normal"
            required
            fullWidth
            name="description"
            label="Product Description"
            type="description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            className="button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {title.toUpperCase()}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModifyProduct;
