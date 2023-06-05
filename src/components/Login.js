import {
  Button,
  TextField,
  Box,
  CardContent,
  Card,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Center from "./Center";
import useForm from "../hooks/useForm";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import useStateContext from "../hooks/useStateContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const getFreshModel = () => ({
  email: "",
  password: "",
});

export default function Login() {
  const { context, setContext } = useStateContext();

  const navigate = useNavigate();
  const handleClick = (e) => navigate("/register");

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const login = (e) => {
    e.preventDefault();
    if (validate())
      //console.log(values);
      createAPIEndpoint(ENDPOINTS.user)
        .authorize(values)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", JSON.stringify(res.data));
          axios.defaults.headers.common["Authorization"] = `Bearer ${res.data}`;
          setContext({ userId: res.data.userId, username: res.data.userI });
          navigate("/todo");
        })
        .catch((err) => console.log(err));
  };

  const validate = () => {
    let temp = {};
    temp.username = values.username != "" ? "" : "This field is required";
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? "" : "Email is not valid.";
    setErrors(temp);
    return Object.values(temp).every((x) => x == "");
  };

  return (
    <Center>
      {context.username}
      <Card sx={{ width: "400px" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ my: 3 }}>
            MethodWorx Todo
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                margin: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate autoComplete="off" onSubmit={login}>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.email && { error: true, helperText: errors.email })}
              />

              <TextField
                label="Password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "40%" }}
              >
                Login
              </Button>
            </form>
            <p onClick={handleClick}>Register</p>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}
