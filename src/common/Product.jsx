import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import "./Product.css";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import { toast } from "react-toastify";

const Product = ({ product, userInfo, onDelete }) => {
  const navigate = useNavigate();

  const [deleteDialog, showDeleteDialog] = useState(false);

  //Navigate to update product page
  const modifyHandler = () => {
    navigate(`/update/${product.id}`);
  };

  //Delete the product
  const handleDelete = () => {
    fetch(`/api/products/${product.id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": userInfo.token,
      },
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(
            "There was a problem with the Fetch operation: " + res.status,
          );
      })
      .then(() => {
        onDelete(product.id); //Removes the product from product listing
        showDeleteDialog(false);
        toast.success(`Product ${product.name} deleted successfully`, {
          toastId: "product-delete",
        });
      })
      .catch((err) => {
        toast.error(err.toString(), { toastId: "product-delete" });
      });
  };

  return (
    <>
      <DeleteDialog
        open={deleteDialog}
        onAccept={handleDelete}
        onReject={() => showDeleteDialog(false)}
      />
      <Card className="card" sx={{ width: 350, height: 450 }} key={product.id}>
        <CardMedia
          sx={{ height: 200 }}
          image={product.imageUrl}
          title={product.name}
          alt={product.name}
          key={product.id}
        />
        <CardContent>
          <div className="cardContent">
            <Typography
              className="productName"
              gutterBottom
              variant="h6"
              component="div"
            >
              {product.name}
            </Typography>
            <Typography
              className="price"
              gutterBottom
              variant="h6"
              component="div"
            >
              <span>&#x20B9;</span> {product.price}
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions className="CTA" sx={{ mt: 2 }}>
          <Link className="buy" to={`/product/${product.id}`}>
            <Button size="small" variant="contained" color="primary">
              Buy
            </Button>
          </Link>
          {/* Check if user role is Admin and show edit & delete icons */}
          {userInfo.roles.includes("ADMIN") && (
            <Typography className="adminOps">
              <IconButton aria-label="edit" onClick={modifyHandler}>
                <Edit fontSize="small" />
              </IconButton>

              <IconButton
                aria-label="delete"
                onClick={() => showDeleteDialog(true)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Typography>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Product;
