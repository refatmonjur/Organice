import React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";
import "./Todo.css";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Button from "@mui/material/Button";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OpenDialog from "./Dialog/OpenDialog.js";
import DescriptionDialog from "./Dialog/DescriptionDialog";
import MoreProperties from "./Dialog/MoreProperties.js";

export default function AddTodo() {
  const [input, setInput] = useState("");
  const { user } = useUserAuth();
  // const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription]= useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("i am here ");
    const todosCollec = collection(db, "user", user.uid, "todos");
    if (input !== "") {
      await addDoc(todosCollec, {
        title: input,
        completed: false,
        timeStamp: serverTimestamp(),
        dueDate: dateTime,
        Description: description
      });
      setInput("");
      setDateTime("");
      setDescription("");
    }
  };
  
  // const handleChange = (newValue) => {
  //   setDateTime(newValue);
  // };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input_container">
        <input
          type="text"
          className="task-input"
          placeholder="Enter new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div>
      </div>
      <div>
        {/* the dialog  */}
        <MoreProperties dateTime={dateTime} setDateTime={setDateTime} setDescription = {setDescription} />
      </div>
      <div className="btn_container">
        <button>Add</button>
      </div>
      <div>
        {/* <div>
          <OpenDialog dateTime={dateTime} setDateTime={setDateTime} />
        </div>
        <div>
          <DescriptionDialog setDescription = {setDescription} />
        </div> */}
      </div>
    </form>
  );
}
