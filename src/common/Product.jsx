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
import { Link } from "react-router-dom";

import "./Product.css";

const Product = ({ product, userInfo }) => {
  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
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
        <Link className="buy" to={`/${product.id}`}>
          <Button size="small" variant="contained" color="primary">
            Buy
          </Button>
        </Link>

        {userInfo.roles.includes("ADMIN") && (
          <Typography className="adminOps">
            <IconButton aria-label="delete" onClick={handleEdit}>
              <Edit fontSize="small" />
            </IconButton>

            <IconButton aria-label="delete" onClick={handleDelete}>
              <Delete fontSize="small" />
            </IconButton>
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default Product;
