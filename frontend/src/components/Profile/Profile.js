import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import "./Profile.css";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { useState } from "react";
import { db } from "../../firebase";
import imageavatar from "./avatar.png";
import { useUserAuth } from "../Context/UserAuthContext";
import { useLocation } from "react-router-dom";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";
// function useQuery() {
//   const location = useLocation();
//   return new URLSearchParams(location.search);
// }

function Profile() {
  const [open, setOpen] = useState(false);
  const [openPass, setOpenPass] = useState(false);
  const [email, setEmail] = useState("");
  const { user } = useUserAuth();
  const { passwordUpdate } = useUserAuth();
  const [currentUser, setCurrentUser] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosePass = () => {
    passwordUpdate(email);
    setOpenPass(false);
  };

  const handleClickOpenPass = () => {
    setOpenPass(true);
  };
  async function getUsers(db) {
    try {
      const userDocRef = doc(db, "user", user.uid);
      const data = await getDoc(userDocRef);
      const fields = [];
      fields.push(data.data());
      setCurrentUser(fields);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    getUsers(db);
  }, []);
  return (
    <div>
      <NewHomeNavbar />

      <div className="welcome">Welcome Back,</div>

      {/* everything goes inside here */}
      <div className="container_1 bg-dark shadow-lg p-5 mb-5 rounded border-primary">
        {/* image container */}
        <div className="avatar--container">
          <img
            src={imageavatar}
            style={{
              width: 200,
              height: 200,
              borderRadius: 200,
              border: "3px ridge ",
            }}
          />
        </div>
        {/* name field */}
        {currentUser.map((users) => {
          return (
            <div className="namefield-container bg-light">
              {/* <TextField
                id="outlined-basic"
                variant="standard"
                size="small"
                value={"Name: " + users.firstName + " " + users.lastName}
                InputProps={{
                  readOnly: true,
                }}
              /> */}
              <TextField
                id="outlined-read-only-input"
                label="Name:"
                value={ users.firstName + " " + users.lastName}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            </div>
          );
        })}

        {/* update user info */}
        <div className="userinfo-container">
          <button
            style={{ height: "50px", width: "280px" }}
            className="btn btn-light btn-lg"
            onClick={handleClickOpen}
          >
            Update User Info
          </button>
        </div>

        {/* update password */}
        <div className="password-container">
          <button
            style={{ height: "50px", width: "280px" }}
            className="btn btn-light btn-lg"
            onClick={handleClickOpenPass}
          >
            Update Password
          </button>
        </div>

        {/* <div>
          <TextField id="outlined-basic" label="Change Passwordç" variant="outlined" />
        </div>
        <div>
          <TextField id="outlined-basic" label="Change Passwordç" variant="outlined" />
        </div> */}
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update User Info</DialogTitle>
          <DialogContent>
            <div className="userwindow">
              <TextField
                id="outlined-basic"
                label=" Enter New First Name"
                variant="outlined"
                size="small"
              />
              <TextField
                id="outlined-basic"
                label=" Enter New Last Name"
                variant="outlined"
                size="small"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Update Info</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={openPass} onClose={handleClosePass}>
          <DialogTitle>Update Password</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-basic"
              label=" Enter Email"
              variant="outlined"
              size="small"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePass}>Cancel</Button>
            <Button onClick={handleClosePass}>Send Password Reset</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
    // {/*
    //       <div className='button'>

    //         <TextField id="outlined-basic" label="Change Passwordç" variant="outlined" />
    //       </div>

    //       <div className='picture'>
    //         <Stack>
    //           <Avatar
    //             sx={{ bgcolor: deepOrange[500] }}
    //             alt="Remy Sharp"
    //             src="/broken-image.jpg"
    //           >
    //             R
    //           </Avatar>

    //         </Stack>
    //       </div> */}
  );
}

export default Profile;
