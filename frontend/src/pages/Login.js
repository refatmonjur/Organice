import React from "react";
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
          />
          <TextField
            label="Password"
            placeholder="Enter password..."
            type="password"
            fullWidth
            required
            style={stylField}
          />
          <Button
            type="submit"
            color="success"
            variant="contained"
            halfWidth
            style={stylButn}
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
