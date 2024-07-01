import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { createVendor, editVendor, getVendors } from "../../apis/menu/vendors";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccesstoken } from "../../utlis/utils";

const VendorForm = () => {
  const [formData, setFormData] = useState({
    vendorName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (type === "edit" && id) {
      populateForm(id);
    }
  }, [type, id]);

  const populateForm = async (id) => {
    const data = await getVendors(id);
    // console.log(data.vendor);
    if (!data.error) {
      setFormData((prevState) => ({
        ...prevState,
        ...data.vendor,
        address: {
          ...prevState.address,
          ...data.vendor.address,
        },
      }));
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const access_token = getAccesstoken();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = "";
    type === "create"
      ? (data = await createVendor({ obj: formData, access_token }))
      : (data = await editVendor({ id, obj: { formData }, access_token }));
    // console.log(data);
    !data.error && navigate("/vendors");
  };

  return (
    <Container
      sx={{
        border: "solid",
        borderColor: "black",
        borderWidth: "2",
        mt: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, textAlign: "left", mb: 5 }}>
        {type === "create" ? "Create " : "Edit "}Vendor
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="vendorName"
              label="Vendor Name"
              variant="outlined"
              size="medium"
              value={formData.vendorName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="contactName"
              label="Contact Name"
              variant="outlined"
              size="medium"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="contactEmail"
              label="Contact Email"
              variant="outlined"
              size="medium"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="contactPhone"
              label="Contact Phone"
              variant="outlined"
              size="medium"
              value={formData.contactPhone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 1, textAlign: "left" }}>
              Address
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="street"
              label="Street"
              variant="outlined"
              size="medium"
              value={formData.address.street}
              onChange={handleAddressChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="city"
              label="City"
              variant="outlined"
              size="medium"
              value={formData.address.city}
              onChange={handleAddressChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="state"
              label="State"
              variant="outlined"
              size="medium"
              value={formData.address.state}
              onChange={handleAddressChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="postalCode"
              label="Postal Code"
              variant="outlined"
              size="medium"
              value={formData.address.postalCode}
              onChange={handleAddressChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="country"
              label="Country"
              variant="outlined"
              size="medium"
              value={formData.address.country}
              onChange={handleAddressChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button variant="contained" type="submit" sx={{ mr: 2 }}>
                Submit
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/vendors");
                }}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default VendorForm;
