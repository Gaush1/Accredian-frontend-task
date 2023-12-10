import {
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormHelperText
} from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useState } from "react";


function Register() {
  const[message,setMessage] = useState("Please fill this form to create an account !");
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "0px auto",
  };

  const headerStyle = {
    margin: "0",
  };

  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "It's to Short").required("Required"),
    email: Yup.string().email("Please Enter Valid Email").required("Required"),
    phoneNumber: Yup.number().typeError("Enter Valid Phone number").required("Required"),
    password: Yup.string().min(8,"Password minimum length should be 8").required("Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')],"Password not matched").required("Required"),
    termsAndConditions: Yup.string().oneOf(['true'],"Accept term and condition's")
  });

  const handleSubmit = async(values, props) => {
    try {
      axios.post('http://localhost:8000/register',values)
      .then(res => {
        if(res.data.Status === "Success"){
         props.resetForm();
         props.setSubmitting(false);
         setMessage("Registeration Succesfully Please Login !");
        } else {
          setMessage(res.data.Error);
        }
      })
    } catch (error) {
      console.error("Register Error", error);
    }
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          {  
          <Typography variant="caption" gutterBottom>
            {message}
          </Typography> }
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
                name="name"
                label="name"
                type="text"
                placeholder="Enter name"
                variant="standard"
                fullWidth
                required
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter Email"
                variant="standard"
                fullWidth
                required
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                name="phoneNumber"
                label="Phone Number"
                type="text"
                placeholder="Enter Phone Number"
                variant="standard"
                fullWidth
                required
                helperText={<ErrorMessage name="phoneNumber" />}
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
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                variant="standard"
                fullWidth
                required
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <FormControlLabel
                control={
                  <Field
                    as={Checkbox}
                    name="termsAndConditions"
                    color="primary"
                    
                  />
                }
                label="I accept the terms and conditions."
              />
              <FormHelperText><ErrorMessage name="termsAndConditions" /></FormHelperText>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? "Loading" : "Sign Up"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}

export default Register;
