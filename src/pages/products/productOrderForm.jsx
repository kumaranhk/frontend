import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getProducts } from "../../apis/menu/products";
import { useNavigate, useSearchParams } from "react-router-dom";
import { makeOrder } from "../../apis/menu/order";
import { getAccesstoken } from "../../utlis/utils";

const ProductOrderForm = () => {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const type = searchParam.get("type");

  const [formData, setFormData] = useState({
    title: "",
    quantity: 1,
    vendorName: "",
    description: "",
    totalPrice: 0,
    pricePerQuantity: 0,
  });
  const [currentProduct, setCurrentProduct] = useState({});
  const access_token = getAccesstoken();
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProducts({ id, access_token });
      const product = res.product;
      setCurrentProduct(product);
      setFormData({
        title: product.title || "",
        quantity: 1,
        vendorName: product.vendorName || "",
        description: product.description || "",
        totalPrice: product.sellingPrice || 0,
        pricePerQuantity: product.sellingPrice || 0,
      });
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      const updatedFormData = {
        ...prevState,
        [name]: value,
      };
      if (name === "quantity" || name === "pricePerQuantity") {
        updatedFormData.totalPrice =
          updatedFormData.quantity * updatedFormData.pricePerQuantity;
      }
      return updatedFormData;
    });
  };

  const handlePriceCalculation = () => {
    setFormData((prevState) => ({
      ...prevState,
      totalPrice: prevState.quantity * prevState.pricePerQuantity,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await makeOrder({
      data: {
        ...formData,
        productId: currentProduct.id,
        vendorId: currentProduct.vendorId,
        transactionType: type,
      },
      access_token,
    });
    !res.error && navigate("/products");
  };

  return (
    <>
      <Box
        className="position-absolute top-50 start-50 translate-middle border border-primary z-3 w-75 p-5 bg-white"
        sx={{ zIndex: 1100, mt: 4 }}
      >
        <Typography sx={{ p: 2, fontSize: "h4.fontSize" }}>
          Order Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="title"
            label="Title"
            variant="outlined"
            size="medium"
            margin="normal"
            value={formData.title}
            onChange={handleChange}
            disabled
          />
          <TextField
            fullWidth
            name="quantity"
            label="Quantity"
            type="number"
            variant="outlined"
            size="medium"
            margin="normal"
            value={formData.quantity}
            onChange={handleChange}
          />
          <TextField
            disabled
            fullWidth
            name="description"
            label="Description"
            variant="outlined"
            size="medium"
            margin="normal"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="pricePerQuantity"
            label="Price per Unit"
            type="number"
            variant="outlined"
            size="medium"
            margin="normal"
            value={formData.pricePerQuantity}
            onChange={handleChange}
            onBlur={handlePriceCalculation}
          />
          <TextField
            fullWidth
            name="totalPrice"
            label="Total Price"
            type="number"
            variant="outlined"
            size="medium"
            margin="normal"
            value={formData.totalPrice}
            onChange={handleChange}
            disabled
          />
          <Box
            sx={{
              p: 2,
              pr: 0,
              display: "flex",
              flexDirection: "row-reverse",
              mb: 1,
            }}
          >
            <Button variant="contained" type="submit">
              Order
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(-1)}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ProductOrderForm;
