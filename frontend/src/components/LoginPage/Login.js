import React from "react";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword , signInWithRedirect,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
import GoogleButton from 'react-google-button'




function Login() {
  let history = useHistory();
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
      history.push("/home");
      console.log(user);
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/wrong-password":
          console.log(error.message);
          return Swal.fire({ icon: "error", title: "Email already exists" });
        case "auth/invalid-email":
          return Swal.fire({ icon: "error", title: "Invalid email" });
        default:
          return Swal.fire({ icon: "error", title: "Something went wrong" });
      }
    }
  };
 
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
      console.log(res.user)
      // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(res);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = res.user;
    history.push("/home");
    }).catch((error) => {
      console.log(error.message)
    })
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
          
          {/* <GoogleButton
            type="submit"
            color="success"
            variant="contained"
            halfWidth
            style={stylButn}
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </GoogleButton> */}

          <GoogleButton
  type="dark" // can be light or dark
  onClick={signInWithGoogle}/>

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
