import React from "react";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../SignUpPage/firebase.js";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import "./Login.css";

function Login() {
  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "150px auto",
  };
  const avatarStyle = { backgroundColor: "indigo" };
  const stylButn = { margin: "8px 0" };
  const stylField = { margin: "8px 0" };

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <div className="app__header"></div>
      <Grid className="login__container">
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2>Sign in </h2>
          </Grid>
          <TextField
            label="Email"
            placeholder="Enter email..."
            fullWidth
            required
            style={stylField}
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <TextField
            label="Password"
            placeholder="Enter password..."
            type="password"
            fullWidth
            required
            style={stylField}
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <Button
            type="submit"
            color="success"
            variant="contained"
            halfWidth
            style={stylButn}
            onClick={login}
          >
            Sign in
          </Button>

          <Typography>
            {" "}
            Don't have an Account?
            <Link href="./signup" underline="hover">
              {"Sign Up"}
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
}

export default Login;
