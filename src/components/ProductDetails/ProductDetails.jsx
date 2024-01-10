import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "./ProductDetails.css";
import Categories from "../../common/Categories";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams(); // Extracting productId from the route parameters
  const { userInfo } = useOutletContext(); // Accessing user information from the context

  // State variables for product details, selected category, and order quantity
  const [product, setProduct] = useState({ category: "" });
  const [category, setCategory] = useState("all");
  const [orderQuantity, setOrderQuantity] = useState(1);

  // Fetch product details based on productId and user authentication
  useEffect(() => {
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
        setProduct(data);
      })
      .catch((err) => {
        toast.error(err.toString(), { toastId: "login-alert" });
      });
  }, [userInfo.token, productId]);

  const capitalizedCategory =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  const handleChange = (e) => {
    //To handle change in the order quantity input field
    if (e.target.value > 0) {
      setOrderQuantity(e.target.value);
    }
  };

  const handlePlaceOrder = () => {
    //To handle placing an order and navigate to the checkout page
    navigate(`/checkout/${productId}`, {
      state: { product, orderQuantity },
    });
  };

  // Render the ProductDetails component
  return (
    <div className="productDetails">
      <Categories category={category} setCategory={setCategory} />
      <Box sx={{ flexGrow: 0.5, mx: 16 }} className="details">
        <Grid
          container
          display="flex"
          direction="row"
          spacing={4}
          alignItems="flex-start"
        >
          {/* Product image */}
          <Grid item xs={4} className="media">
            <img src={product.imageUrl} alt={product.name} />
          </Grid>
          <Grid item sx={{ pl: 6 }} xs={8} className="description">
            <div className="title">
              <Typography variant="h4">{product.name}</Typography>
              <Chip
                label={`Available Quantity: ${product.availableItems}`}
                color="primary"
              />
            </div>
            {/* Product details */}
            <div className="descDetails">
              <Typography variant="subtitle1" gutterBottom>
                Categories: <b>{capitalizedCategory}</b>{" "}
              </Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Typography variant="h4" color="secondary">
                <span>&#x20B9;</span> {product.price}
              </Typography>
            </div>
            {/* Form for ordering */}
            <Box component="form" className="actions">
              <TextField
                required
                type="number"
                inputProps={{
                  min: "1",
                  max: product.availableItems,
                }}
                id="outlined-basic"
                label="Enter Quantity"
                variant="outlined"
                value={orderQuantity}
                onChange={handleChange}
              />

              <Button
                size="medium"
                onClick={handlePlaceOrder}
                className="button"
                variant="contained"
                color="primary"
                sx={{ width: 150, padding: 1 }}
              >
                PLACE ORDER
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProductDetails;
