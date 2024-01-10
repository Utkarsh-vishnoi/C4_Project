import { Box, Divider, Grid, Typography } from "@mui/material";

import "./OrderSummary.css";

const OrderSummary = ({ data }) => {
  return (
    <>
      {/* Container for order summary */}
      <Box
        className="confirm"
        sx={{
          mt: 4,
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          bgcolor: "background.paper",
          color: "text.secondary",
          "& svg": {
            m: 1.5,
          },
          "& hr": {
            mx: 0.5,
          },
        }}
      >
        <Grid item className="confirmOrder">
          <Typography variant="h4" mb={1}>
            {data.product.name}
          </Typography>
          <Typography variant="body1" mb={1}>
            Quantity: {data.orderQuantity}
          </Typography>

          <div className="descDetails">
            <Typography variant="subtitle1" gutterBottom>
              Category:{" "}
              <b>
                {data.product.category.replace(/(^\w|\s\w)/g, (m) =>
                  m.toUpperCase(),
                )}
              </b>{" "}
            </Typography>
            <Typography variant="body2">{data.product.description}</Typography>
            <Typography variant="h5" color="secondary">
              Total Price : <span>&#x20B9;</span>{" "}
              {data.product.price * data.orderQuantity}
            </Typography>
          </div>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid className="address">
          <Typography variant="h4" mb={1}>
            Address Details :
          </Typography>
          <Typography variant="body1">{data.address.address.name}</Typography>
          <Typography variant="body1">
            Contact Number: {data.address.address.contactNumber}
          </Typography>
          <Typography variant="body1">
            {data.address.address.street}, {data.address.address.city},
          </Typography>
          <Typography variant="body1">
            {data.address.address.state}, {data.address.address.landmark},
          </Typography>
          <Typography variant="body1">
            {data.address.address.zipcode}
          </Typography>
        </Grid>
      </Box>
    </>
  );
};

export default OrderSummary;
