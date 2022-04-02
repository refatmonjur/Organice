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

  useEffect(() => {
    setStart(arg);
  });

  const handleInput = (e) => {
    e.preventDefault();
    start = e.target.value();
  };

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
    setEnd("");
    onClose();
  };
  console.log("arg: " + arg);
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="title">
          <DialogTitle>Event</DialogTitle>
          <DialogContentText>
            Create an event for this date (excl).
            <br />
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

          <div>
            <label>Start Date</label>
            <Datetime
              value={start}
              //onChange = {date => setStart(date)}
              onChange={handleStartDate}
              timeFormat={false}
              className="start-date"
            />
          </div>

          <div>
            <label>End Date (Exclusive)</label>
            {
              <Datetime
                value={end}
                //onChange = {date => setEnd(date)}
                timeFormat={false}
                onChange={handleEndDate}
                input={false}
              />
            }
          </div>

          <button>Add event</button>
        </div>
      </form>
    </Dialog>
  );
}
