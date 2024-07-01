import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { createProduct } from "../../apis/menu/products";
import { useNavigate } from "react-router-dom";
import { getVendors } from "../../apis/menu/vendors";
import { getAccesstoken } from "../../utlis/utils";

const initialFormData = {
  title: "",
  description: "",
  purchasePrice: "",
  sellingPrice: "",
  unitOfMeasure: "",
  vendorName: "",
  images: [],
  quantityOnHand: "",
  vendorId: "",
};

const ProductCreationForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();
  const access_token = getAccesstoken();
  useEffect(() => {
    const fetchVendors = async () => {
      const res = await getVendors({ access_token });
      setVendors(res.vendors);
    };
    fetchVendors();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleVendorChange = (e) => {
    const selectedVendor = vendors.find(
      (vendor) => vendor.vendorName === e.target.value
    );
    console.log(selectedVendor);
    setFormData((prevState) => ({
      ...prevState,
      vendorName: selectedVendor.vendorName,
      vendorId: selectedVendor.id,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let images = formData.images.split(",");
    console.log(formData, images);
    console.log({ ...formData, images: images });
    try {
      const response = await createProduct({
        data: { ...formData, images: images },
        access_token,
      });
      console.log("Product created:", response);
      setFormData(initialFormData);
      !response.error && navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{ textAlign: "left" }}>
        Create Product
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          required
          fullWidth
          name="title"
          label="Title"
          variant="outlined"
          margin="normal"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="description"
          label="Description"
          variant="outlined"
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          name="purchasePrice"
          label="Purchase Price"
          type="number"
          variant="outlined"
          margin="normal"
          value={formData.purchasePrice}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          name="sellingPrice"
          label="Selling Price"
          type="number"
          variant="outlined"
          margin="normal"
          value={formData.sellingPrice}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          name="unitOfMeasure"
          label="Unit of Measure"
          variant="outlined"
          margin="normal"
          value={formData.unitOfMeasure}
          onChange={handleChange}
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Vendor</InputLabel>
          <Select
            name="vendorName"
            value={formData.vendorName}
            onChange={handleVendorChange}
            label="Vendor"
            sx={{ textAlign: "left" }}
          >
            {vendors.map((vendor) => (
              <MenuItem key={vendor.id} value={vendor.vendorName}>
                {vendor.vendorName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <TextField
          required
          fullWidth
          name="vendorName"
          label="Vendor Name"
          variant="outlined"
          margin="normal"
          value={formData.vendorName}
          onChange={handleChange}
        /> */}
        <TextField
          required
          fullWidth
          name="images"
          label="Image URL"
          type="string"
          variant="outlined"
          margin="normal"
          value={formData.images}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          name="quantityOnHand"
          label="Quantity On Hand"
          type="number"
          variant="outlined" // Quantity must not be an mandatory field unless order recieved to inventory
          margin="normal"
          value={formData.quantityOnHand}
          onChange={handleChange}
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="secondary"
            type="reset"
            onClick={() => setFormData(initialFormData)}
          >
            Reset
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Create Product
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ProductCreationForm;
