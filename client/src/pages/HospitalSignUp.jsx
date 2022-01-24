import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import api from "../api";


//source code for signup page template: https://github.com/mui-org/material-ui/blob/v4.x/docs/src/pages/getting-started/templates/sign-up/SignUp.js

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [name, setName] = useState("")
  const [postcode, setPostcode] = useState("")
  const [password, setPassword] = useState("")

  async function handleChangeInputName(e) {
    const name =  e.target.value;
    setName(name);

  }

  async function handleChangeInputPostcode(e) {
    const postcode = e.target.value;
    setPostcode(postcode);
  }

  async function handleChangeInputPassword(e) {
    const password = e.target.value;
    setPassword(password);
  }


  async function handleIncludeHospital() {
    const payload = { name, postcode, password};

    await api.insertHospital(payload).then((res) => {
      window.alert(`Hospital Inserted Succesfully`);
      setName("");
      setPostcode("");
      setPassword("");
    });
  }
    

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={name}
                autoComplete="name"
                name="hospitalName"
                variant="outlined"
                required
                fullWidth
                id="hospitalName"
                label="Hospital Name"
                autoFocus
                onChange={handleChangeInputName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={postcode}
                variant="outlined"
                required
                fullWidth
                id="postcode"
                label="Hospital Postcode"
                name="postcode"
                autoComplete="postcode"
                onChange={handleChangeInputPostcode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChangeInputPassword }
              />
            </Grid>
          </Grid>
          <Button
            href="/"
            onClick={handleIncludeHospital}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
