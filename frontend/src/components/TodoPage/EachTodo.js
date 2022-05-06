import React from "react";
import { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Todo.css";
import ShowDesc from "./ShowDesc";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputBase } from "@mui/material";

export default function EachTodo({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
}) {
  const [newInput, setNewInput] = useState(todo.title);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewInput(todo.title);
    } else {
      todo.title = "";
      console.log(todo);
      setNewInput(e.target.value);
    }
  };

  const handleDate = () => {
    const date = new Date(todo.dueDate.toDate());
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const new_date = date.toLocaleDateString(undefined, options);
    return new_date;
  };

  return (
    <div className="todo" style={{}}>
      <input
        style={{ textDecoration: todo.completed && "line-through" }}
        type="text"
        value={todo.title === "" ? newInput : todo.title}
        className="list"
        onChange={handleChange}
      />
      <input
        type="text"
        readOnly
        value={todo.dueDate === "" ? "" : "Date: " + handleDate()}
        className="list"
      />
      <div className="todo-options">
        {/* this is the checked button  */}
        {/* <MoreOptions/> */}
        <button
          className="button-complete"
          style={{
            height: 10,
            width: 10,
          }}
          onClick={() => toggleComplete(todo)}
        >
          <CheckCircleIcon id="i" />
        </button>

        {/* this is the Edit button  */}
        <button
          className="button-edit"
          style={{
            height: 10,
            width: 10,
          }}
          onClick={() => handleEdit(todo, newInput)}
        >
          <EditIcon />
        </button>
        {/* this is the delete button  */}
        <button
          className="button-delete"
          style={{
            height: 10,
            width: 10,
          }}
          onClick={() => handleDelete(todo.id)}
        >
          <DeleteIcon id="i" />
        </button>

        {/* this is the more info button  */}
        <div>
          {/* <ShowDesc Todo={todo} /> */}
          <Button variant="outlined" onClick={handleClickOpen}>
            <MoreHorizOutlinedIcon color="primary" fontSize="medium" />
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Details</DialogTitle>
            <DialogContent>
              {/* show the due date */}
              <div className="desc1">
                {/* <input
                type="text"
                readOnly
                value={todo.dueDate === "" ? "" : "⏰ " + todo.dueDate.toDate()}
                className="list"
              /> */}
                <InputBase
                  //id="outlined-read-only-input"
                  label="Date"
                  fullWidth
                  value={todo.dueDate === "" ? "" : "⏰ " + todo.dueDate.toDate()}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <br />
              {/* this is the description */}
              <div className="desc-container">
                {/* <input
                type="text"
                readOnly
                value={todo.Description}
                className="list"
              /> */}
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  fullWidth
                  rows={4}
                  value={todo.Description}
                />
              </div>

              {/* show file that is added */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>

        {/* <button className="button-moreInfo" onClick={() => handleInfo(todo.id)}>
          <MoreHorizOutlinedIcon id="i" />
        </button> */}
      </div>
    </div>
  );
}
