import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createUser, editUser, getUsers } from "../../apis/menu/users";
import { getAccesstoken } from "../../utlis/utils";

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    employeeId: "",
  });
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "This field is required.";
    tempErrors.email = formData.email ? "" : "This field is required.";
    tempErrors.role = formData.role ? "" : "This field is required.";
    tempErrors.employeeId = formData.employeeId
      ? ""
      : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  useEffect(() => {
    if (type === "edit" && id) {
      populateForm(id);
    }
  }, [type, id]);

  const user = JSON.parse(localStorage.getItem("user"));
  const customerId = user.customerId;

  const populateForm = async () => {
    const data = await getUsers(customerId, id);
    if (!data.error) {
      setFormData((prevState) => ({
        ...prevState,
        ...data.user,
      }));
    } else setFormData({ name: "", email: "", role: "", employeeId: "" });
  };
  const access_token = getAccesstoken();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      let data = "";
      type === "create"
        ? (data = await createUser({ ...formData, customerId, access_token }))
        : (data = await editUser({ id, obj: formData, access_token }));
      console.log(data);
      !data.error && navigate("/users");
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
          {type === "create" ? "Create User" : "Edit User"}
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
          disabled={type === "edit" ? true : false}
          label="Email"
          name="email"
          variant="outlined"
          size="medium"
          value={formData.email}
          onChange={handleChange}
          {...(errors.email && { error: true, helperText: errors.email })}
        />
        <TextField
          label="Role"
          name="role"
          select
          variant="outlined"
          size="medium"
          sx={{ textAlign: "left" }}
          value={formData.role}
          onChange={handleChange}
          {...(errors.role && { error: true, helperText: errors.role })}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="supervisor">Supervisor</MenuItem>
        </TextField>
        <TextField
          label="Employee ID"
          name="employeeId"
          variant="outlined"
          size="medium"
          value={formData.employeeId}
          onChange={handleChange}
          {...(errors.employeeId && {
            error: true,
            helperText: errors.employeeId,
          })}
        />
        <Grid item xs={12}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}
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

export default CreateUserForm;
