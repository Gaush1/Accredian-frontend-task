import React, { useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Login({handleChange}) {
  const[message,setMessage] = useState("Please Login!");
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "0px auto",
  };

  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };

  const passwordStyle = {
    margin: "6px 0",
  };

  const btnStyle = {
    margin: "10px 0",
  };

  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please Enter Valid Email")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, props) => {
    try {
      await axios.post('http://localhost:8000/login',values)
      .then(res => {
        if(res.data.Status === "Success"){
         setMessage("Login Successfull!");
         props.resetForm();
         props.setSubmitting(false);
        } else {
          setMessage(res.data.Error);
          props.resetForm();
        }
      })
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
          <h2 style={{marginBottom:"2px"}}>Sign In</h2>
          {
          <Typography variant="caption" gutterBottom>
            {message}
          </Typography>}
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                name="email"
                label="Email"
                placeholder="Enter Email"
                variant="standard"
                fullWidth
                required
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                name="password"
                label="Password"
                placeholder="Enter Password"
                type="password"
                variant="standard"
                fullWidth
                required
                style={passwordStyle}
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnStyle}
                fullWidth
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? "Loading" : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          <Link href="#" >Forget Password</Link>
        </Typography>
        <Typography>
          Do You have an Account ?<Link href="#" onClick={()=>handleChange('event',1)}>Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
