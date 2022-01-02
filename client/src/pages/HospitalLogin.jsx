import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import api from "../api";


//source code for signin page template: https://github.com/mui-org/material-ui/blob/v4.x/docs/src/pages/getting-started/templates/sign-in/SignIn.js

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();


  const [name, setName] = useState("")
  const [postcode, setPostcode] = useState("")
  const [password, setPassword] = useState("")
  const [aToken, setToken] = useState("")


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

  async function handleLoginAuthentication() {

    
    const payload = {name, postcode, password};

    const response = await api.loginHospital(payload);

    const token = response.data.token;

    setToken(token)

    await api.getLoggedInHospital(token).then((res) => {
      window.alert("Successfully logged in")
    });

    console.log(aToken)

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in 
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="hospitalName"
            label="Hospital Name"
            name="hospitalName"
            autoComplete="hospitalName"
            onChange={handleChangeInputName}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="postcode"
            label="Postcode"
            type="postcode"
            id="postcode"
            autoComplete="postcode"
            onChange={handleChangeInputPostcode}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            onChange={handleChangeInputPassword}
          />
        
        <Button
            href="/home"
            onClick={handleLoginAuthentication}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}