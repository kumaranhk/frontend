import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../apis/menu/users";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin",
    employeeId: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "This field is required.";
    tempErrors.email = formData.email ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      let data = await createCustomer({
        ...formData,
        employeeId: formData.name,
      });
      //   console.log(data);
      if (!data.error) {
        alert("Password Creation mail sent to your registred mail");
        navigate("/log-in");
      }
      setFormData({
        name: "",
        email: "",
        role: "",
        employeeId: "",
      });
    }
  };

  return (
    <Container
      sx={{
        border: "solid",
        borderColor: "black",
        borderWidth: "2",
        pt: 2,
        pb: 5,
        width: "70vw",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" sx={{ textAlign: "left", mb: 2 }}>
          Create Customer
        </Typography>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          value={formData.name}
          size="medium"
          onChange={handleChange}
          {...(errors.name && { error: true, helperText: errors.name })}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          size="medium"
          value={formData.email}
          onChange={handleChange}
          {...(errors.email && { error: true, helperText: errors.email })}
        />
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" sx={{ mr: 2 }}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerForm;
