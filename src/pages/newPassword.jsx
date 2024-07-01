import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createNewPassword } from "../apis/auth/password";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  //   console.log(token);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.newPassword)
      newErrors.newPassword = "New Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.newPassword = "Password does not matches";
      newErrors.confirmPassword = "Password does not matches";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      //   console.log(formData, "Form data");
      let data = await createNewPassword({
        token,
        password: formData.confirmPassword,
      });
      console.log(data);
      !data.error && navigate("/log-in");
      setFormData({
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      setErrors(newErrors);
    }
  };
  return (
    <>
      <Container
        maxWidth="sm"
        style={{ border: "2px solid black", marginTop: "20px" }}
      >
        <Typography sx={{ p: 2, fontSize: "h4.fontSize" }}>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="newPassword"
            name="newPassword"
            label="New Password"
            variant="outlined"
            type="password"
            size="medium"
            margin="normal"
            value={formData.newPassword}
            onChange={handleChange}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            size="medium"
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
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
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default ResetPassword;
