import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "./AddEventModal.css";
import DialogContentText from "@mui/material/DialogContentText";
import { db } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";
import { collection, addDoc } from "firebase/firestore";
export default function AddEventModal({ isOpen, onClose, onEventAdded, arg }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const { user } = useUserAuth();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setStart(arg);
  }, [arg]);

  const handleStartDate = (date) => {
    const newStart = new Date(date);
    setStart(newStart);
  };

  const handleEndDate = (date) => {
    const newEnd = new Date(date);
    setEnd(newEnd);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // onEventAdded({ title, start, end });
    // call database here
    const eventsCollectionRef = collection(db, "user", user.uid, "events");
    if (title !== "") {
      await addDoc(eventsCollectionRef, {
        title: title,
        startDate: start,
        endDate: end,
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
            <DialogContentText>
              
           
            Enter a title:
          </DialogContentText>
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
          <br/>

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
          <br/>

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
          <br/>
          {/* add attachment */}
          <div>
            <label>Add Attachment</label>
            <br />
            <input
              type="file"
              className="file-upload-button"
              name="attchment"
              style={{
                color: "blue",
                marginBottom: 30,
              }}
            />
          </div>
          <br/>
          {/* add description */}
          <div>
            <label>Add description</label>
            <TextField
              id="standard-multiline-flexible"
              label="Description"
              multiline
              fullWidth
              rows={4}
              // value={value}
              // onChange={handleChange}
              variant="standard"
            />
          </div>
          <br/>

          {/* add location (zoom url) */}
          <div>
            <label>
              Add Event Location
            </label>
            <br/>
            <TextField id="standard-basic" label="Location" variant="standard" fullWidth multiline/>

          </div>
<br/>
          <button>Add event</button>
        </div>
      </form>
    </Dialog>
  );
}
