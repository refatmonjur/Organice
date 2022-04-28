import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import TextField from "@mui/material/TextField";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "./AddEventModal.css";
import DialogContentText from "@mui/material/DialogContentText";
import { db, storage } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";
import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { Button, Slide } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
export default function AddEventModal({ isOpen, onClose, onEventAdded, arg }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [urlAttachment, setUrlAttachment] = useState("");
  const { user } = useUserAuth();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setStart(arg);
    setProgress(0);
    setEnd("");
    setUrlAttachment("");
    setLocation("");
    setDescription("");
  }, [arg]);

  const handleStartDate = (date) => {
    const newStart = new Date(date);
    setStart(newStart);
  };

  const handleEndDate = (date) => {
    const newEnd = new Date(date);
    setEnd(newEnd);
  };
  const handleDescription = (newValue) => {
    setDescription(newValue);
  };
  const handleLocation = (newValue) => {
    setLocation(newValue);
  };
  const handleAttachment = (e) => {
    console.log(e);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    // handleAttachment(event);
    const promises = [];
    let file = e.target[3].files[0];
    console.log(file);
    if (!file) return;
    const storageRef = ref(storage, `/CalendarImages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    promises.push(uploadTask);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setUrlAttachment(downloadURL);
        });
      }
    );
    Promise.all(promises).then(() => {
      console.log("this is after the promise");
    });
    // setProgress(0);
  };

  const handleSubmit = async (e) => {
    console.log(urlAttachment);
    e.preventDefault();
    const eventsCollectionRef = doc(db, "user", user.uid, "events", title);
    if (title !== "") {
      await setDoc(eventsCollectionRef, {
        title: title,
        startDate: start,
        endDate: end,
        Description: description,
        Location: location,
        Attachment: urlAttachment,
      });
    }
    console.log("Title: " + title);
    console.log("Start: " + start);
    console.log("Type: " + typeof start);
    console.log("End: " + end);
    setEnd("");
    setTitle("");
    onClose();
  };

  console.log("arg: " + arg);
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit} className="addEventModal_outter">
        <div>
          <div className="title">
            <DialogTitle>Create an Event</DialogTitle>
            <DialogContentText>Enter a title:</DialogContentText>
            <TextField
              autoFocus
              fullWidth
              id="title"
              type="text"
              variant="standard"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <br />

          <div>
            <label>Start Date</label>
            <Datetime
              value={start}
              //onChange = {date => setStart(date)}
              onChange={handleStartDate}
              // dateFormat={false}
              //timeFormat={false}
              // className="start-date"
            />
          </div>
          <br />

          <div>
            <label>End Date</label>
            {
              <Datetime
                value={end}
                //onChange = {date => setEnd(date)}
                //timeFormat={false}
                onChange={handleEndDate}
                // input={false}
              />
            }
          </div>
          <br />
          {/* add attachment */}
          <div>
            <label>Add Attachment</label>
            <br />
            <div className="d-flex justify-content-between">
              <input
                type="file"
                className="file-upload-button"
                name="attachment"
                style={{
                  color: "blue",
                  marginBottom: 30,
                }}
                // onChange={(e) => {
                //   handleAttachment(e.target.value);
                // }}
              />
              <div>
                {progress == 100 ? (
                  <div className="d-flex">
                    <CheckCircleOutlineIcon fontSize="large" color="success" />
                    <h5 className="p-2 text-muted">Uploaded</h5>
                  </div>
                ) : (
                  <button type="submit" className="bg-dark mb-4">
                    <DriveFolderUploadIcon />
                  </button>
                )}
              </div>
            </div>
          </div>

          <br />
          <div>
            <label>Add description</label>
            <TextField
              id="standard-multiline-flexible"
              label="Description"
              multiline
              fullWidth
              rows={4}
              // value={description}
              onChange={(e) => {
                handleDescription(e.target.value);
              }}
              variant="standard"
            />
          </div>
          <br />

          {/* add location (zoom url) */}
          <div>
            <label>Add Event Location</label>
            <br />
            <TextField
              id="standard-basic"
              label="Location"
              variant="standard"
              fullWidth
              multiline
              onChange={(e) => {
                handleLocation(e.target.value);
              }}
            />
          </div>
          <br />
          <button className="bg-dark" onClick={(e) => handleSubmit(e)}>
            Add event
          </button>
        </div>
      </form>
    </Dialog>
  );
}
