import React, { useState } from "react";
import { Step, StepLabel, Stepper, Button, Box, Grid } from "@mui/material";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import AddressSelector from "../AddressSelector/AddressSelector";
import OrderSummary from "../OrderSummary/OrderSummary";
import { toast } from "react-toastify";

const steps = ["Items", "Select Address", "Confirm Order"];

const Checkout = () => {
  const { userInfo } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeStep, setActiveStep] = useState(1);
  // State to store the selected address during the checkout process
  const [address, setAddress] = useState({ label: "", address: { id: "" } });

  // Function to create a new order
  const createOrder = () => {
    fetch(`/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userInfo.token,
      },
      body: JSON.stringify({
        user: userInfo.id,
        product: location.state.product.id,
        address: address.address.id,
        quantity: location.state.orderQuantity,
      }),
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(
            "There was a problem with the Fetch operation: " + res.status,
          );
        return res.json();
      })
      .then((data) => {
        navigate("/", { state: { message: "Order placed successfully!" } });
      })
      .catch((err) => {
        toast.error(err.toString(), { toastId: "order-alert" });
      });
  };
  // Function to validate if address is present
  const validate = (activeStep) => {
    if (activeStep === 1) {
      if (address.label === "") {
        toast.error("Please select address !", { toastId: "Address-Selector" });
        return false;
      }
    }
    return true;
  };

  // Function to handle the "Next" button click
  const handleNext = () => {
    if (activeStep !== steps.length - 1) {
      if (validate(activeStep))
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      createOrder();
    }
  };

  // Function to handle the "Back" button click
  const handleBack = () => {
    if (activeStep !== 1) setActiveStep((prevActiveStep) => prevActiveStep - 1);
    else navigate(-1);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={3}
          style={{
            marginTop: 6,
          }}
        >
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Stepper activeStep={activeStep} sx={{ width: "80%" }}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </div>
            {/* Display the appropriate component based on the active step */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              {activeStep === 1 && <AddressSelector setAddress={setAddress} />}
              {activeStep === 2 && (
                <OrderSummary data={{ ...location.state, address }} />
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="text" color="primary" onClick={handleBack}>
                BACK
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === 2 ? "PLACE ORDER" : "NEXT"}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Checkout;
