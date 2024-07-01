import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { requirePassWordChnage } from "../apis/auth/password";

const ForgotPassWord = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // console.log(formData, "Form data");
      let data = await requirePassWordChnage(formData);
      console.log(data);
      setFormData({
        email: "",
      });
    } else {
      setErrors(newErrors);
    }
  };
  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          border: "2px solid black",
          marginTop: "20px",
          width: "500px ",
        }}
      >
        <Typography sx={{ p: 2, fontSize: "h6.fontSize" }}>
          Enter Registered Email
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            size="medium"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <Box
            sx={{
              p: 2,
              pr: 0,
              pl: 0,
              mb: 1,
            }}
          >
            <Button size="small" variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default ForgotPassWord;
