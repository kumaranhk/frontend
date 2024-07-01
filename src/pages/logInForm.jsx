import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { validateUser } from "../apis/auth/user";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const naviagte = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // console.log(formData, "Form data");
      let data = await validateUser(formData);
      if (!data.error) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isAuthenticated", true);
        naviagte("/products");
      }
      console.log(data);
      setFormData({
        email: "",
        password: "",
      });
    } else {
      setErrors(newErrors);
    }
  };
  return (
    <Container
      maxWidth="sm"
      style={{ border: "2px solid black", marginTop: "20px" }}
    >
      <Typography sx={{ p: 2, fontSize: "h4.fontSize" }}>Log-In</Typography>
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
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          size="medium"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Box
          sx={{
            p: 2,
            pr: 0,
            pl: 0,
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Button variant="contained" type="submit">
            Log In
          </Button>
          <Link variant="contained" href="/forgot-password">
            Forgot Password
          </Link>
        </Box>
      </form>
    </Container>
  );
};

export default LogIn;
