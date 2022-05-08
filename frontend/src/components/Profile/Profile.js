import React from "react";
import { useEffect } from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import TextField from "@mui/material/TextField";
import "./Profile.css";
import { Button } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { useState } from "react";
import { db } from "../../firebase";
import imageavatar from "./avatar.png";
import { useUserAuth } from "../Context/UserAuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Profile() {
  const [open, setOpen] = useState(false);
  const [openPass, setOpenPass] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { user } = useUserAuth();
  const { passwordUpdate } = useUserAuth();
  const [currentUser, setCurrentUser] = useState([]);

  const handleClose = () => {
    handleNameUpdate(firstName, lastName);
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
      const userDocRef = doc(db, "user", `${user?.uid}`);
      const data = await getDoc(userDocRef);
      const fields = [];
      fields.push(data.data());
      setCurrentUser(fields);
    } catch (e) {
      console.log(e.message);
    }
  }
  const handleNameUpdate = async (firstName, lastName) => {
    const docRef = doc(db, "user", `${user?.uid}`);
    await updateDoc(docRef, { firstName: firstName, lastName: lastName });
  };

  useEffect(() => {
    getUsers(db);
    setFirstName("");
    setLastName("");
  }, []);
  return (
    <div>
      <NewHomeNavbar />
      <div className="welcome">Welcome Back,</div>
      <div className="container_1 bg-dark shadow-lg p-5 mb-5 rounded border-primary">
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
        {currentUser.map((users) => {
          return (
            <div className="bg-dark">
              <h3 className="text-light border-bottom border-secondary">
                Name:{" "}
                <span className="text-warning">
                  {users?.firstName + " " + users?.lastName}
                </span>
              </h3>
            </div>
          );
        })}

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
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label=" Enter New Last Name"
                variant="outlined"
                size="small"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
  );
}

export default Profile;
