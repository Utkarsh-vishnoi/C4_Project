import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const AddressSelector = ({ setAddress }) => {
  const { userInfo } = useOutletContext();
  const [addresses, setAddresses] = useState([]);
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [addressId, setAddressId] = useState("");

  useEffect(() => {
    if (addressId !== "")
      setAddress(
        addresses.filter((address) => address.address.id === addressId)[0],
      );
    else setAddress({ label: "", address: { id: "" } });
  }, [addressId, addresses, setAddress]);

  // Use effect to fetch user addresses
  useEffect(() => {
    fetch(`/api/addresses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userInfo.token,
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
        // Map addresses to include labels for the Select component
        setAddresses(
          data.map((address) => ({
            address,
            //Translate first letter of all words to uppercase
            label: address.name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
          })),
        );
      })
      .catch((err) => {
        toast.error(err.toString(), { toastId: "categories-alert" });
      });
  }, [userInfo.token, refresh]);

  const clearForm = () => {
    setName("");
    setContactNumber("");
    setStreet("");
    setCity("");
    setState("");
    setLandmark("");
    setZipcode("");
  };

  //Function to save address after validation
  const addAddressHandler = (e) => {
    e.preventDefault();
    setError("");
    if (
      name === "" ||
      contactNumber === "" ||
      street === "" ||
      city === "" ||
      state === "" ||
      zipcode === ""
    ) {
      setError("All fields must not be empty");
      return false;
    }
    fetch(`/api/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userInfo.token,
      },
      body: JSON.stringify({
        name,
        contactNumber,
        street,
        city,
        state,
        landmark,
        zipcode,
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
        setRefresh(!refresh);
        clearForm();
        toast.success(`Address added successfully`, {
          toastId: "add-product",
        });
      })
      .catch((err) => {
        toast.error(err.toString(), { toastId: "categories-alert" });
      });
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box
            component="form"
            noValidate
            sx={{
              mb: 2,
            }}
            style={{
              textAlign: "left",
              width: "100%",
            }}
          >
            <Typography display="block">Select Address</Typography>
            <FormControl style={{ width: "100%" }} size="small">
              <Select
                labelId="add-address-label"
                value={addressId}
                displayEmpty
                inputProps={{
                  id: "add-address",
                  "aria-label": "Without label",
                }}
                onChange={(e) => setAddressId(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select...</em>
                </MenuItem>
                {addresses.map((address) => (
                  <MenuItem key={address.address.id} value={address.address.id}>
                    {address.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Typography variant="body2" sx={{ mb: 2 }}>
            -OR-
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Add Address
            </Typography>

            <Box
              component="form"
              onSubmit={addAddressHandler}
              noValidate
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
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                value={contactNumber}
                margin="normal"
                required
                fullWidth
                name="contactNumber"
                label="Contact Number"
                type="text"
                id="contactNumber"
                autoComplete="tel-national"
                onChange={(e) => setContactNumber(e.target.value)}
              />
              <TextField
                value={street}
                margin="normal"
                required
                fullWidth
                name="street"
                label="Street"
                type="text"
                id="street"
                autoComplete="shipping street-address"
                onChange={(e) => setStreet(e.target.value)}
              />
              <TextField
                value={city}
                margin="normal"
                required
                fullWidth
                name="city"
                label="City"
                type="text"
                id="city"
                autoComplete="address-level2"
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                value={state}
                margin="normal"
                required
                fullWidth
                name="state"
                label="State"
                type="text"
                id="state"
                autoComplete="address-level1"
                onChange={(e) => setState(e.target.value)}
              />
              <TextField
                value={landmark}
                margin="normal"
                fullWidth
                name="landmark"
                label="Landmark"
                type="text"
                id="landmark"
                onChange={(e) => setLandmark(e.target.value)}
              />
              <TextField
                value={zipcode}
                margin="normal"
                required
                fullWidth
                name="zipcode"
                label="Zip Code"
                type="number"
                id="zipcode"
                autoComplete="postal-code"
                onChange={(e) => setZipcode(e.target.value)}
              />
              {error && (
                <Typography variant="body1" color="secondary">
                  {error}
                </Typography>
              )}
              <Button
                className="button"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                SAVE ADDRESS
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AddressSelector;
